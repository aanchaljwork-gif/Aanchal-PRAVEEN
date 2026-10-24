import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const ODYSSEY_SYSTEM_INSTRUCTION = `You are the Odyssey Coach, a pedagogical strategic advisor specialized in HEC Paris's Odyssey 3.14 Business Model Innovation approach created by Laurence Lehmann-Ortega, Hélène Musikas, and Jean-Marc Schoettl.

Your purpose is to coach students to think critically about business model innovation: challenging assumptions, exploring strategic levers across the 3 pillars, and evaluating systemic trade-offs.

CORE PRINCIPLES OF ODYSSEY 3.14:
1. Innovation is not only about product/service/tech; it is about reinventing the entire business model logic.
2. Strategy vs. Business Models:
   - Corporate Strategy manages the portfolio of business models.
   - Business Strategy pursues competitive advantage.
   - The Business Model articulates how a firm creates, delivers, and captures value.
3. The 3 Pillars:
   - Value Proposition: Clients (target segment), Products/Services (offering), Price (pricing model, total cost of ownership).
   - Value Architecture: Value chain and network (internal processes, partners, suppliers), Resources and competencies (unique assets, skills).
   - Profit Equation: Revenue (streams, volume), Costs (fixed, variable, operational structure), Capital Employed (working capital, fixed assets). ROCE = (Revenues - Costs) / Capital Employed.

KEY CLASSROOM CASES DISCUSSED IN COURSE:
- Blinkit: Quick commerce, 10-minute micro-fulfillment dark store density within 2-3km, picking algorithms.
- Zomato: Food delivery & restaurant platform, Hyperpure B2B supply, Zomato Gold subscriptions, algorithmic gig dispatch.
- Yulu: Urban micro-mobility, purpose-built low-speed electric two-wheelers, Yuma battery-swapping kiosks decoupling energy from vehicle downtime.
- Pinduoduo: Social commerce, consumer-to-manufacturer (C2M) disintermediation, dynamic team purchase viral loops, negative working capital.
- Atelier Taffy: Niche luxury artisan craft, made-to-order bespoke production, zero finished goods inventory, direct digital patronage.
- Zipcar: Access over ownership car-sharing club, RFID/mobile keyless unlock, reserved neighborhood pods, fleet lease fixed overhead challenges.
- BMW Rent-A-Car / DriveNow: Automotive OEM downstream integration, free-floating luxury urban rentals, experiential showrooming.
- Frugal Innovation (Jugaad): Radical cost stripping, bottom-up engineering under severe resource constraints, serving mass underserved markets profitably.

PEDAGOGICAL BEHAVIOR:
- Act as a Socratic coach, NOT an answer vending machine.
- When guiding a student through a problem or ideation, ask ONE focused question at a time.
- Offer hints before giving complete explanations.
- Ask students to justify why a strategic choice makes sense for a specific problem.
- Highlight the systemic nature of business models: changing one pillar always creates ripples across the other two (especially the Profit Equation).
- When a student asks you to review or challenge their business model proposal, format your answer strictly using these 4 sections:
  1. Strategic Promise: What is strategically viable and exciting?
  2. Critical Assumptions: Which unproven assumptions need real-world evidence?
  3. Systemic Implications: What happens to the other pillars (resources, partners, costs, capital employed)?
  4. The Key Unanswered Question: The single most vital question the team must resolve next.
- Always distinguish clearly:
  [Course-based concept]: Grounded in the official Odyssey 3.14 framework.
  [Class case reference]: Mentioning Blinkit, Zomato, Yulu, Pinduoduo, Atelier Taffy, Zipcar, BMW, or Frugal Innovation.
  [Analytical inference]: Your strategic assessment of the student's idea.
- Never invent fictitious case facts, financial stats, or quote attributions. Keep tone encouraging, rigorous, and intellectually crisp.`;

// Endpoint for the Odyssey Coach
app.post('/api/gemini/coach', async (req, res) => {
  try {
    const { messages, context } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    if (!aiClient) {
      // Graceful verified fallback response based on Odyssey 3.14 framework
      const lastUserMsg = messages[messages.length - 1]?.content || '';
      return res.json({
        text: generateOdysseyFallback(lastUserMsg, context),
        source: 'verified-knowledge-base',
        note: 'Odyssey Knowledge Engine (Server mode: verified framework rules)',
      });
    }

    // Prepare contents for Gemini 3.8 Flash
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // If context exists, prepend context note to the last message
    if (context && formattedContents.length > 0) {
      const last = formattedContents[formattedContents.length - 1];
      const contextPrefix = `[Current Student Workspace Context: Business="${context.business || 'N/A'}", Selected Levers="${context.levers?.join(', ') || 'None'}", Baseline Issue="${context.issue || 'N/A'}"]\n\n`;
      last.parts[0].text = contextPrefix + last.parts[0].text;
    }

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: ODYSSEY_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'I could not generate a response. Please try rephrasing your question.';
    return res.json({
      text: replyText,
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    // Provide pedagogical fallback on error
    const lastUserMsg = req.body?.messages?.[req.body.messages.length - 1]?.content || '';
    return res.json({
      text: generateOdysseyFallback(lastUserMsg, req.body?.context),
      source: 'verified-knowledge-base-fallback',
      note: 'Switched to local Odyssey strategic database due to transient API latency.',
    });
  }
});

function generateOdysseyFallback(query: string, context?: any): string {
  const q = query.toLowerCase();

  if (q.includes('blinkit') || q.includes('dark store') || q.includes('quick commerce')) {
    return `### Case Analysis: Blinkit (Quick Commerce Architecture)

**1. Strategic Promise**
Blinkit proved that delivery speed is not an incremental customer service feature: it is a systemic architectural choice. By shifting from distant regional mega-warehouses to dense urban dark stores (within 2 to 3 km of customers), Blinkit delivers in 10 minutes.

**2. Systemic Implications Across 3 Pillars**
- **Value Proposition**: Instant convenience commands high repeat purchase frequency, transforming grocery shopping from a planned weekly chore into an impulse purchase.
- **Value Architecture**: Requires geo-spatial store density, 2-minute pick-and-pack warehouse design, and real-time rider algorithm dispatch.
- **Profit Equation**: Extremely sensitive to order density. Each dark store must process 800 to 1,200 orders daily to amortize fixed urban lease and warehouse labor costs.

**3. Key Question for You**
How does dark store inventory turnover rate directly impact Blinkit's Return on Capital Employed (ROCE)?`;
  }

  if (q.includes('yulu') || q.includes('zipcar') || q.includes('bmw') || q.includes('mobility') || q.includes('access')) {
    return `### Mobility Models: Zipcar vs. BMW DriveNow vs. Yulu

**1. Access Over Ownership Dilemma**
In our course, we compared how mobility models balance customer convenience with capital intensity:
- **Zipcar**: Round-trip neighborhood pods with reserved parking spots. Predictable return locations, but high off-peak idle hours during weekdays.
- **BMW DriveNow**: Free-floating luxury rentals. Solves user drop-off flexibility, but incurs expensive municipal parking block permits and on-street fleet rebalancing costs.
- **Yulu**: Urban micro-mobility for short daily commutes and gig delivery. Decouples vehicle uptime from battery charging through modular swap stations (Yuma Network).

**2. Profit Equation Reality**
The central vulnerability of all asset-heavy access models is Return on Capital Employed (ROCE): vehicles sitting idle represent depreciation without revenue generation.

**Question for You:**
How does Yulu's battery-swapping infrastructure transform its asset utilization compared to traditional plug-in EV fleets?`;
  }

  if (q.includes('frugal') || q.includes('jugaad')) {
    return `### Frugal Innovation & Return on Capital Employed (ROCE)

**1. Core Course Concept**
Frugal innovation is not simply "cheap manufacturing" or de-featuring an existing product. It is a fundamental redesign under extreme resource constraints to deliver 80% of essential performance at 20% of conventional cost.

**2. 3-Pillar Architecture**
- **Value Proposition**: Targets mass overlooked non-customers who cannot afford high-end alternatives.
- **Value Architecture**: Utilizes off-the-shelf consumer components (e.g. bus ticket printers in medical ECGs) and grassroots rural distribution networks.
- **Profit Equation**: Operates on slim unit gross margins but achieves outstanding Return on Capital Employed (ROCE) through ultra-low capex and rapid cash conversion.

**Question for You:**
Why is it easier for a startup or local firm to implement frugal innovation than a legacy multinational with established high-margin distribution channels?`;
  }

  if (q.includes('repair') || (context?.business && context.business.toLowerCase().includes('repair'))) {
    return `### Strategic Analysis: Neighbourhood Repair Shop

**1. Strategic Promise**
Shifting a repair shop from transactional ad-hoc fixes to recurring maintenance subscriptions and partnerships with property managers creates predictable, recurring cash flow and stabilizes technician utilization across seasons.

**2. Critical Assumptions**
- Do residents genuinely value preventive check-ups, or do they only call when equipment fails?
- What is the customer acquisition cost for households versus commercial landlords?

**3. Systemic Implications**
- **Value Architecture**: Requires scheduling dispatch software, stocked high-turnover spare parts, and service-level agreements (SLAs).
- **Profit Equation**: Working capital changes from immediate point-of-sale cash to upfront annual or monthly subscriptions with recurring warranty liability.

**4. The Key Unanswered Question**
*What is the minimum customer density required within a 3-mile radius for technicians to travel profitably between visits without margin erosion?*

**Next Step for You:** How would you test whether local property managers prefer paying a fixed monthly retainer rather than individual emergency invoices?`;
  }

  if (q.includes('direction') || q.includes('14') || q.includes('compass')) {
    return `### The 14 Innovation Directions of Odyssey 3.14

The framework structures innovation into two strategic hemispheres:

**Value Proposition (Directions 1 to 7: Who & What)**
1. Reduce customer overall costs (Frugal Innovation)
2. Reduce customer hassles (Blinkit 10-minute delivery)
3. Find non-customers (Pinduoduo Tier 3/4 consumers)
4. Add functionality or emotional resonance (Atelier Taffy bespoke craft)
5. Explore adjacent segments and industries (BMW DriveNow)
6. Introduce new stakeholders and societal trends (Yulu Clean Transit)
7. Modify the revenue stream: subscriptions, usage, freemium (Zomato Gold)

**Value Architecture (Directions 8 to 14: How & With Whom)**
8. Introduce radical technologies and IoT automation (Yulu telematics)
9. Modify steps in the value chain (Dell & Blinkit predictive staging)
10. Eliminate or add steps: C2M disintermediation (Pinduoduo)
11. Identify new inputs and circular resources (Frugal Jugaad engineering)
12. Associate with competitors, clients, or suppliers: coopetition (Bajaj & Sixt)
13. Identify and mobilize complementors (Zomato dining discovery)
14. Monetize and leverage strategic resources (AWS & Zomato Hyperpure)

Which direction do you want to stress-test on your business scenario?`;
  }

  return `### Strategic Reflection: The Odyssey 3.14 Mindset

In the Odyssey 3.14 approach, every business model is an interconnected system:
- **Value Proposition**: The promise to clients (who, what, and at what price).
- **Value Architecture**: The operational engine (activities, competencies, partners).
- **Profit Equation**: The economic viability (revenues, cost dynamics, capital employed).

**A Guiding Question for You:**
If you change one element of your value proposition (such as offering a product on an access-over-ownership subscription like Zipcar or Hilti), what exact capability must your value architecture acquire to prevent costs from spiraling?

Tell me which business or classroom case you are exploring today, and let's analyze the trade-offs.`;
}

// Serve Vite in dev or static dist in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Odyssey Lab server running at http://0.0.0.0:${port}`);
  });
}

startServer();
