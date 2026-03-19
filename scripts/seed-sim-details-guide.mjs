#!/usr/bin/env node

/**
 * Seed script: Creates a detailed SEO blog post
 *
 * Post: How to Check SIM Details in Pakistan – 2026 Complete Guide
 *
 * Usage:
 *   1. Add SANITY_API_TOKEN to .env.local (Editor permission)
 *   2. Run: node scripts/seed-sim-details-guide.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(process.cwd(), '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const env = {};

envContent.split('\n').forEach((line) => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
  }
});

const token = env.SANITY_API_TOKEN;
if (!token) {
  console.error('\n❌ SANITY_API_TOKEN not found in .env.local');
  console.error('   1. Open your Sanity project API settings');
  console.error('   2. Create a token with "Editor" permission');
  console.error('   3. Add: SANITY_API_TOKEN="sk-..." to .env.local');
  process.exit(1);
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ihwkkxlq',
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-19',
  token,
  useCdn: false,
});

let keyCounter = 0;
function key() {
  return `k${Date.now().toString(36)}${(keyCounter++).toString(36)}`;
}

function textBlock(text, style = 'normal') {
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  };
}

function headingBlock(text, level = 'h2') {
  return textBlock(text, level);
}

function bulletList(items) {
  return items.map((text) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }));
}

function numberedList(items) {
  return items.map((text) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'number',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }));
}

function blockquoteBlock(text) {
  return textBlock(text, 'blockquote');
}

function codeBlock(code, language = 'text') {
  return {
    _type: 'codeBlock',
    _key: key(),
    language,
    code,
  };
}

async function ensureAuthor() {
  let author = await client.fetch(`*[_type == "author" && name == "SIM Finder Team"][0]{ _id, name }`);
  if (!author) {
    author = await client.create({
      _type: 'author',
      name: 'SIM Finder Team',
      slug: { _type: 'slug', current: 'sim-finder-team' },
      bio: [textBlock('Editorial team writing practical guides on SIM verification, mobile privacy, and telecom safety in Pakistan.')],
    });
  }
  return author;
}

async function ensureCategory(title, slug, description) {
  let cat = await client.fetch(`*[_type == "category" && title == $title][0]{ _id, title }`, { title });
  if (!cat) {
    cat = await client.create({
      _type: 'category',
      title,
      slug: { _type: 'slug', current: slug },
      description,
    });
  }
  return cat;
}

async function run() {
  console.log('🌱 Creating SEO guide post...');

  const author = await ensureAuthor();
  const guides = await ensureCategory('Guides', 'guides', 'Practical tutorials and step-by-step explainers');
  const security = await ensureCategory('Security', 'security', 'Security and identity-protection content');

  const slug = 'how-to-check-sim-details-pakistan-2026-guide';

  const existing = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{ _id }`, { slug });
  if (existing) {
    console.log('ℹ️ Existing post found with same slug, replacing it...');
    await client.delete(existing._id);
  }

  const body = [
    headingBlock('Introduction: Why SIM Detail Checking Matters in Pakistan', 'h2'),

    textBlock('Checking SIM details is no longer just a technical task. In Pakistan, your mobile number is tightly connected to your CNIC, banking alerts, social media recovery, and even legal identity verification. If an unknown SIM is registered against your CNIC, the risk is not just spam calls. It can affect your security, reputation, and legal standing.'),
    textBlock('Many users only check their SIM registration when they lose a phone or face a suspicious issue. A better approach is to treat SIM detail checks like a regular digital hygiene routine. Just as you update your passwords, you should confirm which mobile numbers are registered against your CNIC every few months.'),
    textBlock('In this complete guide, you will learn practical and legal ways to check SIM details in Pakistan. We will cover official methods, what each result means, how to identify red flags, and exactly what to do if you find unauthorized numbers. The steps are designed for ordinary users, students, professionals, and business owners alike.'),

    headingBlock('What “SIM Details” Actually Includes', 'h2'),

    textBlock('When people say “SIM details,” they usually mean one of two things: either the number of SIMs registered against a CNIC, or the ownership and network status of a specific SIM. Both are important, and each is used in different situations.'),
    textBlock('For CNIC-level checks, the goal is to see a complete count of active SIMs linked to your identity. For number-level checks, the goal is to confirm network, activity, and whether that number truly belongs to you or someone else.'),

    ...bulletList([
      'CNIC-linked SIM count across all telecom operators',
      'Network-wise breakdown (Jazz, Zong, Telenor, Ufone, SCO)',
      'Status of lines (active, blocked, or inactive)',
      'Risk indicator: unknown or unexpected numbers on your CNIC',
      'Action path: where to report and how to block suspicious SIMs',
    ]),

    blockquoteBlock('Quick rule: If a number appears against your CNIC and you do not personally use it, treat it as a priority security issue and start a blocking request immediately.'),

    headingBlock('Official Methods to Check SIM Details', 'h2'),

    textBlock('In Pakistan, always prefer official channels first. Third-party tools can help with convenience, but your final verification should rely on authoritative sources and your operator support process.'),

    headingBlock('Method 1: USSD Check (*336#)', 'h3'),
    textBlock('The fastest and most popular method is dialing *336#. This method works on major operators and returns a CNIC-linked summary. It is simple, does not require an app, and can be done from almost any mobile handset.'),
    ...numberedList([
      'Open your phone dialer and enter *336#',
      'Send the request and wait for the network response',
      'Review the count of SIMs linked with your CNIC',
      'Compare the count with your known and active numbers',
      'If numbers look suspicious, move to operator/franchise verification',
    ]),

    headingBlock('Method 2: SMS to 668', 'h3'),
    textBlock('If USSD is temporarily unavailable in your area, SMS to 668 is another commonly used route. You send your 13-digit CNIC (without dashes), and receive a network-level response with linked SIM information.'),
    codeBlock('Send to: 668\nMessage format: 3520212345671\n(Use your own 13-digit CNIC)', 'text'),
    textBlock('This option is useful when users want a written record in their SMS inbox. It also helps when users are checking from feature phones that handle SMS more reliably than interactive USSD sessions.'),

    headingBlock('Method 3: Franchise or Customer Support Verification', 'h3'),
    textBlock('For final action—especially blocking unauthorized SIMs—visit an official franchise with your original CNIC. This is often the most effective path when a suspicious number appears and you need immediate correction in operator records.'),
    ...numberedList([
      'Visit official franchise of the relevant operator',
      'Bring original CNIC and, if possible, one active verified number',
      'Ask for CNIC-linked SIM list and suspicious-number review',
      'Submit block/disown request for unknown number(s)',
      'Collect complaint/reference number and save it for follow-up',
    ]),

    headingBlock('Structured Snapshot: SIM Check Methods', 'h2'),
    textBlock('Use the table below as a quick decision reference. It helps you choose the best method based on urgency, device type, and whether you need immediate action.'),
    codeBlock(
`Method | Best For | Speed | Output Type | Action Capability
*336# USSD | Quick personal check | Fast | On-screen summary | Low (check only)
SMS to 668 | Written record in inbox | Medium | SMS response | Low (check only)
Franchise visit | Unknown SIM removal | Medium | Verified account record | High (block/disown)
Support helpline | Follow-up and complaint tracking | Medium | Ticket/reference ID | Medium`,
      'text'
    ),

    headingBlock('How to Read Results Correctly (And Avoid Mistakes)', 'h2'),

    textBlock('Users often panic when they see unexpected counts, but there are normal scenarios too. For example, an old family SIM may still be active under your CNIC, or a secondary data line may be forgotten. So first, verify calmly and classify each number before filing complaints.'),
    textBlock('A practical approach is to create a simple list: “mine,” “family-authorized,” “inactive-but-known,” and “unknown.” Only numbers in the unknown category should be escalated immediately.'),
    ...bulletList([
      'Mine: current personal SIMs you use every week',
      'Family-authorized: SIMs you intentionally registered for household members',
      'Inactive-known: old but recognized numbers',
      'Unknown: numbers you never requested or used',
    ]),

    headingBlock('Warning Signs You Should Not Ignore', 'h3'),
    ...bulletList([
      'SIM count suddenly increases without your knowledge',
      'You receive OTP or banking alerts on numbers you do not recognize',
      'Call records or legal notices mention unfamiliar lines',
      'Operator support confirms recent SIM issuance you did not request',
      'Franchise history cannot explain a registration event clearly',
    ]),

    headingBlock('Step-by-Step: What to Do If You Find Unauthorized SIMs', 'h2'),

    textBlock('If an unknown number appears against your CNIC, do not delay. The best response is structured and documented. A quick, evidence-based process helps operators resolve your request faster and protects you if escalation is needed later.'),

    ...numberedList([
      'Take screenshots or note exact response details (date, time, method used)',
      'Identify operator network for each suspicious number',
      'Visit official franchise with original CNIC and request immediate block/disown process',
      'Get a written complaint number or digital ticket ID',
      'Re-check SIM status after 24–72 hours to confirm update',
      'If unresolved, escalate through operator helpline and then PTA complaint channel',
    ]),

    textBlock('When filing complaints, clarity helps. Avoid emotional language. State only facts: your CNIC, unknown number(s), date of discovery, and requested action. This improves response quality and speeds up closure.'),

    headingBlock('SIM Security Best Practices for Daily Life', 'h2'),

    textBlock('SIM security is not a one-time event. It is a recurring habit. Most fraud attempts succeed because users assume registration problems are rare. In reality, periodic checks, careful CNIC handling, and quick reporting drastically reduce risk.'),

    ...bulletList([
      'Check CNIC-linked SIMs every 2–3 months',
      'Do not share CNIC photos over untrusted WhatsApp groups or unknown portals',
      'Use official franchises instead of roadside or unverified retailers',
      'Keep your primary number updated for banking and recovery alerts',
      'Enable SIM PIN lock and phone lock for extra protection',
      'Immediately report stolen phone/SIM to operator and temporarily block line',
      'Maintain a personal list of all legitimate numbers under your CNIC',
    ]),

    blockquoteBlock('Security mindset: “If I cannot explain why this SIM exists, it should not stay active under my CNIC.”'),

    headingBlock('Business Use Case: Employees and Company-Managed SIMs', 'h2'),

    textBlock('Small businesses often issue SIM cards to field teams, drivers, support staff, or sales agents. If these SIMs are not managed properly, ownership confusion grows and risk increases. Business owners should separate personal and company registration workflows.'),
    textBlock('The best model is a controlled inventory: assign each SIM to a person, track activation date, and perform monthly audits. When employees leave, close or reassign lines formally rather than leaving numbers floating in unclear ownership states.'),

    ...numberedList([
      'Create a SIM inventory sheet with employee assignment',
      'Review active lines monthly by department/team',
      'Deactivate unused numbers immediately',
      'Use one accountable admin for operator communication',
      'Store complaint and issuance records in one shared folder',
    ]),

    headingBlock('Common Myths About SIM Detail Checking', 'h2'),

    headingBlock('Myth 1: “If I do not use a number, it cannot hurt me.”', 'h3'),
    textBlock('Reality: If a SIM is linked to your CNIC, misuse can still create legal and security complications. Ownership linkage matters even if usage is not yours.'),

    headingBlock('Myth 2: “Checking once is enough forever.”', 'h3'),
    textBlock('Reality: SIM data can change over time due to issuance, reactivation, or administrative errors. Periodic checks are the safer strategy.'),

    headingBlock('Myth 3: “Any retailer can solve unauthorized SIM problems.”', 'h3'),
    textBlock('Reality: For high-confidence correction, use official franchise and documented complaint channels. Informal retail points may not provide proper resolution records.'),

    headingBlock('SEO-Friendly FAQ: Quick Answers Users Search For', 'h2'),

    headingBlock('How can I check how many SIMs are on my CNIC?', 'h3'),
    textBlock('Use *336# or SMS your CNIC to 668 for a quick count. For exact correction and removal of unknown SIMs, visit the operator franchise with original CNIC.'),

    headingBlock('Is checking SIM details legal in Pakistan?', 'h3'),
    textBlock('Yes. Checking your own CNIC-linked SIM details is legal and recommended. It helps maintain compliance and protects against identity misuse.'),

    headingBlock('What if an unknown SIM appears on my CNIC?', 'h3'),
    textBlock('Immediately file a block/disown request with the relevant operator franchise, keep complaint ID, and re-check status after 24–72 hours.'),

    headingBlock('How many SIMs are allowed per CNIC?', 'h3'),
    textBlock('The commonly enforced limit is up to 5 SIMs per CNIC across telecom operators. Confirm latest policy updates through official PTA/operator channels.'),

    headingBlock('Final Checklist: 5-Minute SIM Safety Routine', 'h2'),

    ...numberedList([
      'Run a CNIC SIM check via *336# or SMS 668',
      'List all registered numbers and mark unknown entries',
      'Block unauthorized numbers through official franchise',
      'Save complaint IDs and follow up after 48 hours',
      'Set quarterly reminders for repeat SIM verification',
    ]),

    textBlock('If you follow this routine consistently, you can dramatically reduce the risk of unauthorized SIM usage. The goal is not only to stay compliant, but to protect your personal identity, communication channels, and financial accounts connected to your mobile number.'),
    textBlock('In short: check early, document clearly, and act quickly. That combination gives you the strongest protection in Pakistan’s mobile identity ecosystem.'),
  ];

  const doc = await client.create({
    _type: 'post',
    title: 'How to Check SIM Details in Pakistan: 2026 Complete Guide',
    slug: { _type: 'slug', current: slug },
    author: { _type: 'reference', _ref: author._id },
    categories: [
      { _type: 'reference', _ref: guides._id, _key: key() },
      { _type: 'reference', _ref: security._id, _key: key() },
    ],
    publishedAt: new Date().toISOString(),
    excerpt: 'Learn how to check SIM details on your CNIC in Pakistan using official methods, identify unknown numbers, and protect your mobile identity step by step.',
    seoTitle: 'How to Check SIM Details in Pakistan (2026 Guide) | SIM Finder',
    seoDescription: 'Step-by-step guide to check CNIC-linked SIM details in Pakistan, verify unknown numbers, and secure your mobile identity with official methods.',
    body,
  });

  console.log('\n✅ Blog post created successfully!');
  console.log(`   Slug:   /blog/${slug}`);
  console.log(`   Doc ID: ${doc._id}`);
  console.log(`   Studio: http://localhost:3000/studio/structure/post;${doc._id}\n`);
}

run().catch((err) => {
  console.error('\n❌ Failed to seed blog post:', err?.message || err);
  process.exit(1);
});
