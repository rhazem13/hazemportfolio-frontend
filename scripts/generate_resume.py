from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "src/assets/Hazem_Ragab_Resume.pdf"
pdfmetrics.registerFont(TTFont("Arial", "C:/Windows/Fonts/arial.ttf"))
pdfmetrics.registerFont(TTFont("ArialBold", "C:/Windows/Fonts/arialbd.ttf"))

PAGE_WIDTH, PAGE_HEIGHT = 612, 792
LEFT, RIGHT = 43, 569
INK = colors.HexColor("#172226")
MUTED = colors.HexColor("#526164")
ACCENT = colors.HexColor("#167b77")
RULE = colors.HexColor("#cbd7d3")

pdf = canvas.Canvas(str(OUTPUT), pagesize=(PAGE_WIDTH, PAGE_HEIGHT))
pdf.setTitle("Hazem Ragab - Backend Software Engineer")
pdf.setAuthor("Hazem Ragab")
y = 746


def line(text, size=9, bold=False, color=INK, leading=12):
    global y
    font = "ArialBold" if bold else "Arial"
    pdf.setFillColor(color)
    pdf.setFont(font, size)
    for wrapped in simpleSplit(text, font, size, RIGHT - LEFT):
        pdf.drawString(LEFT, y, wrapped)
        y -= leading


def section(title):
    global y
    y -= 7
    pdf.setStrokeColor(RULE)
    pdf.line(LEFT, y + 4, RIGHT, y + 4)
    y -= 11
    line(title.upper(), 9, True, ACCENT, 13)


def role(title, period):
    global y
    y -= 3
    pdf.setFont("ArialBold", 10)
    pdf.setFillColor(INK)
    pdf.drawString(LEFT, y, title)
    pdf.setFont("Arial", 8)
    pdf.setFillColor(MUTED)
    pdf.drawRightString(RIGHT, y, period)
    y -= 15


def bullet(text):
    global y
    pdf.setFillColor(ACCENT)
    pdf.circle(LEFT + 3, y + 3, 1.5, fill=1, stroke=0)
    font, size = "Arial", 8.8
    pdf.setFillColor(INK)
    pdf.setFont(font, size)
    for wrapped in simpleSplit(text, font, size, RIGHT - LEFT - 16):
        pdf.drawString(LEFT + 13, y, wrapped)
        y -= 11.5
    y -= 2


line("Hazem Ragab", 22, True, INK, 29)
line("BACKEND SOFTWARE ENGINEER", 10, True, ACCENT, 17)
line("Suez, Egypt  |  rhazem13@yahoo.com  |  linkedin.com/in/rhazem13  |  github.com/rhazem13", 8.5, False, MUTED, 12)
line("Portfolio: hazemportfolio-frontend.pages.dev", 8.5, False, MUTED, 12)

section("Profile")
line("Backend engineer building production real-time audio services and integrations with Node.js, TypeScript and Redis. Experience across concurrency, performance, reliability and enterprise .NET systems.", 8.8, leading=12)

section("Professional experience")
role("Intella  |  Backend Engineer", "Apr 2026 - Present")
bullet("Build and debug production real-time audio relay and integration services, including browser WebSockets, Genesys Cloud and Ameyo/SIP integrations.")
bullet("Fixed concurrent-session quota accounting that could allow approximately 5x usage over-consumption.")
bullet("Reduced recording finalization in a 60-second timeline-gap case from ~18.3 seconds to ~222 ms; moved shared state toward Redis for multi-instance coordination.")
line("Stack: Node.js, TypeScript, Redis, Docker, Kubernetes, Prometheus, Grafana", 8.2, color=MUTED, leading=12)

role("DP World  |  Software Engineer", "Jun 2025 - Apr 2026")
bullet("Developed and maintained enterprise finance, logistics and safety applications using .NET Core, Angular and background Worker Services.")
bullet("Resolved production issues and contributed to legacy modernization in internal operational systems.")

role("Freelance  |  Software Engineer", "Mar 2023 - Aug 2025")
bullet("Delivered client products across e-commerce, social platforms and logistics, including APIs, payments, authentication, maps and real-time features.")
line("Stack: Flask, .NET, Laravel, React, Flutter, PostgreSQL/PostGIS, Redis", 8.2, color=MUTED, leading=12)

section("Selected engineering work")
line("Memory Mate - Designed Flask APIs; used PostGIS for location queries and Redis caching for frequent reads. (Academic)", 8.7, leading=12)
line("Charity Donations - Built role-based Flask/React donation flows and PayPal integration; integrated YOLO-based document validation. (Client)", 8.7, leading=12)
line("AskCity - Built Flutter app and PHP admin dashboard; integrated Agora video, Back4App chat and Firebase phone authentication. (Client)", 8.7, leading=12)

section("Technical skills")
line("Backend: Node.js, TypeScript, .NET Core, C#, Python, Flask, REST APIs, WebSockets", 8.7, leading=12)
line("Data & infrastructure: Redis, PostgreSQL, PostGIS, SQL Server, Docker, Kubernetes, CI/CD", 8.7, leading=12)
line("Observability & systems: Prometheus, Grafana, concurrency, performance debugging, authentication", 8.7, leading=12)

section("Education")
line("B.Sc. Computer Science, Suez University (2023)  |  First in class  |  GPA 3.91 / 4.0", 8.7, leading=12)

if y < 32:
    raise RuntimeError(f"Resume content exceeds one page: y={y}")
pdf.save()
print(f"Created {OUTPUT} (final y={y:.1f})")
