import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as THREE_TYPES from 'three';

@Component({
    selector: 'app-contact-3d-scene',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './contact-3d-scene.component.html',
    styleUrls: ['./contact-3d-scene.component.scss']
})
export class Contact3dSceneComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('sceneCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

    private scene!: THREE_TYPES.Scene;
    private camera!: THREE_TYPES.PerspectiveCamera;
    private renderer!: THREE_TYPES.WebGLRenderer;
    private mixer!: THREE_TYPES.AnimationMixer;
    private animationAction: any;
    private requestAnimationFrameId: number | null = null;
    private isBrowser: boolean;
    private controls: any;
    private clock!: THREE_TYPES.Clock;
    private observer!: IntersectionObserver;
    private hasPlayed = false;
    private isInitialized = false;

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngOnInit(): void { }

    async ngAfterViewInit(): Promise<void> {
        if (this.isBrowser) {
            await this.initThreeJs();
            this.setupScrollObserver();
        }
    }

    ngOnDestroy(): void {
        if (this.requestAnimationFrameId !== null) {
            cancelAnimationFrame(this.requestAnimationFrameId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    private setupScrollObserver(): void {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasPlayed && this.animationAction) {
                    this.hasPlayed = true;
                    this.animationAction.reset();
                    this.animationAction.play();
                    console.log('Animation triggered on scroll');
                }
            });
        }, { threshold: 0.3 });

        this.observer.observe(this.canvasRef.nativeElement);
    }

    private async initThreeJs(): Promise<void> {
        const THREE = await import('three');
        const { GLTFLoader } = await import('three-stdlib');
        const { OrbitControls } = await import('three-stdlib');

        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(45, this.getAspectRatio(), 0.1, 1000);

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

        // Load 3D Model (GLB/GLTF)
        const gltfLoader = new GLTFLoader();

        try {
            const gltf = await new Promise<any>((resolve, reject) => {
                gltfLoader.load('assets/3d/getintouch.glb',
                    resolve,
                    undefined,
                    reject
                );
            });
            const model = gltf.scene;
            const animations = gltf.animations;

            console.log('Contact 3D model loaded successfully');
            console.log('Animations:', animations);

            // Set Position & Scale (same as about-me)
            const modelScale = 16;
            model.scale.set(modelScale, modelScale, modelScale);
            model.position.set(0, -1, 0);

            // Enable shadows and fix materials
            model.traverse((child: any) => {
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

            this.scene.add(model);

            // Setup Animation (don't play yet - wait for scroll)
            if (animations && animations.length > 0) {
                this.mixer = new THREE.AnimationMixer(model);
                this.animationAction = this.mixer.clipAction(animations[0]);
                this.animationAction.setLoop(THREE.LoopOnce, 1);
                this.animationAction.clampWhenFinished = true;
                // Don't play here - wait for IntersectionObserver
                console.log('Animation ready, waiting for scroll:', animations[0].name);
            }

            // Set fixed camera position (same as about-me)
            this.camera.position.set(0, 12, 45);
            this.camera.lookAt(0, 12, 0);

            // Add OrbitControls
            if (this.controls) this.controls.dispose();
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.target.set(0, 12, 0);
            this.controls.update();

            this.isInitialized = true;

        } catch (error) {
            console.error('Error loading contact 3D model:', error);
        }

        this.animate(THREE);
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
