import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as THREE_TYPES from 'three';

@Component({
    selector: 'app-about-me-3d-scene',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './about-me-3d-scene.component.html',
    styleUrls: ['./about-me-3d-scene.component.scss']
})
export class AboutMe3dSceneComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('sceneCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

    private scene!: THREE_TYPES.Scene;
    private camera!: THREE_TYPES.PerspectiveCamera;
    private renderer!: THREE_TYPES.WebGLRenderer;
    private mixer!: THREE_TYPES.AnimationMixer;
    private requestAnimationFrameId: number | null = null;
    private isBrowser: boolean;
    private controls: any;
    private clock!: THREE_TYPES.Clock;

    // Tweakable variables
    public cameraPosition = { x: 3, y: 2, z: 5 };
    public guyPosition = { x: 0, y: -1, z: 0 };

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngOnInit(): void { }

    async ngAfterViewInit(): Promise<void> {
        if (this.isBrowser) {
            await this.initThreeJs();
        }
    }

    ngOnDestroy(): void {
        if (this.requestAnimationFrameId !== null) {
            cancelAnimationFrame(this.requestAnimationFrameId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
    }

    private async initThreeJs(): Promise<void> {
        const THREE = await import('three');
        const { GLTFLoader } = await import('three-stdlib');
        const { OrbitControls } = await import('three-stdlib');

        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(45, this.getAspectRatio(), 0.1, 1000);
        this.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvasRef.nativeElement,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(this.canvasRef.nativeElement.clientWidth, this.canvasRef.nativeElement.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
        this.scene.add(ambientLight);

        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2.0);
        hemisphereLight.position.set(0, 20, 0);
        this.scene.add(hemisphereLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 3.0);
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        // Load Character (GLB/GLTF)
        const gltfLoader = new GLTFLoader();

        try {
            // Load character using GLTFLoader
            const gltf = await new Promise<any>((resolve, reject) => {
                gltfLoader.load('assets/3d/guy_typing.glb',
                    resolve,
                    undefined,
                    reject
                );
            });
            const guy = gltf.scene;
            const guyAnimations = gltf.animations;

            console.log('Model loaded successfully');
            console.log('Guy Animations:', guyAnimations);

            // Set Position & Scale for Character
            const guyScale = 16; // Much larger scale for better visibility
            guy.scale.set(guyScale, guyScale, guyScale);
            guy.position.set(0, -1, 0);

            // Enable shadows and fix materials
            guy.traverse((child: any) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.frustumCulled = false;

                    if (child.material) {
                        child.material.visible = true;
                        child.material.side = THREE.DoubleSide;
                        child.material.needsUpdate = true;
                    }
                }
                child.visible = true;
            });

            this.scene.add(guy);

            // Play Animation if available
            if (guyAnimations && guyAnimations.length > 0) {
                this.mixer = new THREE.AnimationMixer(guy);
                const action = this.mixer.clipAction(guyAnimations[0]);
                action.play();
                console.log('Playing animation:', guyAnimations[0].name);
            }

            // Set fixed camera position (bounding box is broken for SkinnedMesh)
            // Position camera to see full body
            this.camera.position.set(0, 12, 45); // Further back to see full body
            this.camera.lookAt(0, 12, 0); // Look at center of body

            // Add OrbitControls
            if (this.controls) this.controls.dispose();
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.target.set(0, 12, 0); // Target at body center
            this.controls.update();

        } catch (error) {
            console.error('Error loading model:', error);
        }

        this.animate(THREE);
    }

    private fitCameraToSelection(camera: THREE_TYPES.PerspectiveCamera, selection: THREE_TYPES.Object3D[], fitOffset: number = 1.2, THREE: any) {
        const box = new THREE.Box3();

        selection.forEach(object => {
            box.expandByObject(object);
        });

        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const maxSize = Math.max(size.x, size.y, size.z);
        const fitHeightDistance = maxSize / (2 * Math.atan(Math.PI * camera.fov / 360));
        const fitWidthDistance = fitHeightDistance / camera.aspect;
        const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);

        // Nice view from front-right
        const direction = new THREE.Vector3(1, 0.5, 1).normalize().multiplyScalar(distance);

        camera.position.copy(center).add(direction);
        camera.lookAt(center);

        this.cameraPosition = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    }

    private animate(THREE: any): void {
        if (!this.isBrowser) return;

        this.requestAnimationFrameId = requestAnimationFrame(() => this.animate(THREE));

        const delta = this.clock.getDelta();
        if (this.mixer) {
            this.mixer.update(delta);
        }

        this.renderer.render(this.scene, this.camera);
    }

    @HostListener('window:resize')
    onResize(): void {
        if (!this.isBrowser || !this.camera || !this.renderer) return;

        const width = this.canvasRef.nativeElement.clientWidth;
        const height = this.canvasRef.nativeElement.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    private getAspectRatio(): number {
        if (!this.isBrowser) return 1;
        return this.canvasRef.nativeElement.clientWidth / this.canvasRef.nativeElement.clientHeight;
    }
}
