"""Render the client proposal from its Markdown source; requires reportlab."""
from pathlib import Path
import html
import os
import re
import sys

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, Flowable,
)

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "social-posts-manager/seo-i-tresci.md"
OUTPUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "assets/pdf/magmari-plan-etapow.pdf"
FONT_PAIRS = [
    (os.getenv("DOCS_FONT_REGULAR", ""), os.getenv("DOCS_FONT_BOLD", "")),
    ("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
    ("/System/Library/Fonts/Supplemental/Arial.ttf", "/System/Library/Fonts/Supplemental/Arial Bold.ttf"),
]
for regular, bold in FONT_PAIRS:
    if regular and bold and Path(regular).is_file() and Path(bold).is_file():
        pdfmetrics.registerFont(TTFont("Docs", regular))
        pdfmetrics.registerFont(TTFont("DocsBold", bold))
        pdfmetrics.registerFontFamily("Docs", normal="Docs", bold="DocsBold", italic="Docs", boldItalic="DocsBold")
        break
else:
    raise RuntimeError("Provide DOCS_FONT_REGULAR and DOCS_FONT_BOLD with Unicode TTF paths")

INK = colors.HexColor("#202B41")
PURPLE = colors.HexColor("#6941C6")
MUTED = colors.HexColor("#536079")
LIGHT = colors.HexColor("#F3F0FA")
LINE = colors.HexColor("#E1DCEB")
WIDTH = 511
styles = {
    "body": ParagraphStyle("body", fontName="Docs", fontSize=10.2, leading=14.8, textColor=INK, spaceAfter=8),
    "h1": ParagraphStyle("h1", fontName="DocsBold", fontSize=23, leading=28, textColor=INK, spaceAfter=15),
    "h2": ParagraphStyle("h2", fontName="DocsBold", fontSize=12, leading=16, textColor=PURPLE, spaceBefore=7, spaceAfter=7, keepWithNext=True),
    "small": ParagraphStyle("small", fontName="Docs", fontSize=8.8, leading=12.5, textColor=MUTED, spaceAfter=6),
    "cell": ParagraphStyle("cell", fontName="Docs", fontSize=9.1, leading=13, textColor=INK),
    "step": ParagraphStyle("step", fontName="Docs", fontSize=10.1, leading=14, textColor=INK),
    "label": ParagraphStyle("label", fontName="DocsBold", fontSize=9, leading=12, textColor=PURPLE),
}


def inline(text):
    text = text.replace("–", "-").replace("—", "-")
    text = html.escape(text).replace("&lt;br/&gt;", "<br/>")
    text = re.sub(r"\*\*(.*?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r'<link href="\2" color="#6941C6">\1</link>', text)
    return text


def para(text, style="body"):
    return Paragraph(inline(text), styles[style])


class StepCard(Flowable):
    def __init__(self, number, text):
        super().__init__()
        self.number = number
        self.paragraph = para(text, "step")
        _, ph = self.paragraph.wrap(WIDTH - 66, 500)
        self.width, self.height = WIDTH, max(57, ph + 20)

    def draw(self):
        c = self.canv
        c.setFillColor(LIGHT)
        c.roundRect(0, 4, WIDTH, self.height - 8, 8, fill=1, stroke=0)
        c.setFillColor(PURPLE)
        c.circle(24, self.height - 25, 12, fill=1, stroke=0)
        c.setFillColor(colors.white)
        c.setFont("DocsBold", 10)
        c.drawCentredString(24, self.height - 28.5, str(self.number))
        self.paragraph.drawOn(c, 48, 11)


class PhaseStrip(Flowable):
    def __init__(self, labels):
        super().__init__()
        self.labels = labels
        self.width, self.height = WIDTH, 64

    def draw(self):
        c = self.canv
        box = (WIDTH - 32) / 3
        for i, label in enumerate(self.labels):
            x = i * (box + 16)
            c.setFillColor(LIGHT)
            c.roundRect(x, 9, box, 43, 6, fill=1, stroke=0)
            p = para(label, "label")
            _, h = p.wrap(box - 22, 50)
            p.drawOn(c, x + 11, 30 - h / 2)
            if i < 2:
                c.setStrokeColor(PURPLE)
                c.setLineWidth(1.2)
                c.line(x + box + 3, 30, x + box + 12, 30)
                c.line(x + box + 9, 33, x + box + 12, 30)
                c.line(x + box + 9, 27, x + box + 12, 30)


def markdown_blocks(text):
    blocks = []
    parts = re.split(r"\n\s*\n", text.strip())
    for part in parts:
        lines = part.strip().splitlines()
        if not lines:
            continue
        if lines[0].startswith("|"):
            rows = []
            for line in lines:
                if re.match(r"\|\s*---", line):
                    continue
                cells = [c.strip() for c in line.strip().strip("|").split("|")]
                rows.append([para(c, "cell") for c in cells])
            cols = len(rows[0])
            widths = [WIDTH * 0.32, WIDTH * 0.68] if cols == 2 else [WIDTH * 0.23, WIDTH * 0.385, WIDTH * 0.385]
            table = Table(rows, colWidths=widths, repeatRows=1, hAlign="LEFT")
            table.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, 0), LIGHT),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]))
            blocks.extend([table, Spacer(1, 11)])
        elif lines[0].startswith("### "):
            blocks.append(para(lines[0][4:], "h2"))
            if len(lines) > 1:
                blocks.append(para(" ".join(lines[1:])))
        elif re.match(r"\d+\. ", lines[0]):
            for line in lines:
                blocks.append(para(line))
        else:
            blocks.append(para(" ".join(lines)))
    return blocks


def page_frame(c, doc):
    c.setFillColor(PURPLE)
    c.rect(42, 797, 28, 4, fill=1, stroke=0)
    c.setFont("DocsBold", 9)
    c.drawString(79, 795, "VINTAL / ARTYKUŁY AI")
    c.setFillColor(MUTED)
    c.setFont("Docs", 8)
    c.drawRightString(553, 795, "Propozycja do omówienia | 23.10.2026")
    c.setStrokeColor(LINE)
    c.line(42, 45, 553, 45)
    c.setFont("Docs", 8)
    c.drawString(42, 30, "vintal-ai.github.io/docs/social-posts-manager/seo-i-tresci/")
    c.linkURL("https://vintal-ai.github.io/docs/social-posts-manager/seo-i-tresci/", (42, 26, 455, 40), relative=0)
    c.drawRightString(553, 30, str(doc.page))


raw = SOURCE.read_text()
body = raw.split("---", 2)[2].strip()
body = re.sub(r"^\[Pobierz opis w PDF\].*\n", "", body, flags=re.M)
parts = re.split(r"^## (.+)$", body, flags=re.M)
intro = parts[0]
sections = {parts[i]: parts[i + 1].strip() for i in range(1, len(parts), 2)}

story = [para("Kreator artykułów.<br/>Agenci AI.<br/>Akceptacja i publikacja.", "h1")]
intro_paragraphs = re.split(r"\n\s*\n", intro.strip())
story += [para(intro_paragraphs[2]), para("Jak powstaje artykuł", "h2")]
steps = sections["Jak powstaje artykuł"].split("\n\n")
for i, line in enumerate(steps[0].splitlines(), 1):
    story.append(StepCard(i, re.sub(r"^\d+\. ", "", line)))
story.append(Spacer(1, 6))
story.append(para(steps[-1], "small"))
story.append(para(intro_paragraphs[3], "small"))

for key in ["Zlecenie i materiały źródłowe", "Agenci pracujący nad artykułem", "Akceptacja i poprawki", "Formaty artykułu i pobieranie"]:
    story.extend([PageBreak(), para(key, "h1")])
    if key == "Akceptacja i poprawki":
        story.append(PhaseStrip(["Kontrole agentów", "Akceptacje ludzi", "Termin i publikacja"]))
    story.extend(markdown_blocks(sections[key]))

scope_key = "Jedno wdrożenie kreatora artykułów"
story.extend([PageBreak(), para(scope_key, "h1"),
              PhaseStrip(["Input i materiały", "Agenci i akceptacje", "Eksport / Magmari"])])
story.extend(markdown_blocks(sections[scope_key]))

story.extend([PageBreak(), para("Ustalenia i wycena wdrożenia", "h1")])
for key in ["Założenia do uzgodnienia", "Zakres i wycena jednego wdrożenia"]:
    story.append(para(key, "h2"))
    story.extend(markdown_blocks(sections[key]))

development_key = "Propozycje rozwoju"
story.extend([PageBreak(), para(development_key, "h1")])
story.extend(markdown_blocks(sections[development_key]))

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
doc = SimpleDocTemplate(str(OUTPUT), pagesize=(595.28, 841.89), leftMargin=42, rightMargin=42,
                        topMargin=68, bottomMargin=58, title="Kreator artykułów z agentami AI", author="Vintal")
doc.build(story, onFirstPage=page_frame, onLaterPages=page_frame)
print(OUTPUT)
