#!/usr/bin/env node

/**
 * Seed script: Creates a fully-featured blog post in Sanity
 *
 * Usage:
 *   1. Get a token from https://www.sanity.io/manage/project/ihwkkxlq/api#tokens
 *      - Click "Add API token", name it "Seed Script", set permissions to "Editor"
 *   2. Add to .env.local:  SANITY_API_TOKEN="your-token-here"
 *   3. Run:  node scripts/seed-blog-post.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env.local
const envPath = resolve(process.cwd(), '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
  }
});

const token = env.SANITY_API_TOKEN;
if (!token) {
  console.error('\n❌ SANITY_API_TOKEN not found in .env.local');
  console.error('   1. Go to: https://www.sanity.io/manage/project/ihwkkxlq/api#tokens');
  console.error('   2. Create a token with "Editor" permissions');
  console.error('   3. Add to .env.local:  SANITY_API_TOKEN="sk-..."');
  process.exit(1);
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ihwkkxlq',
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-02-19',
  token,
  useCdn: false,
});

// Helper to generate unique keys
let keyCounter = 0;
function key() {
  return `k${Date.now().toString(36)}${(keyCounter++).toString(36)}`;
}

// Portable Text block helpers
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

function richTextBlock(children, style = 'normal', markDefs = []) {
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs,
    children,
  };
}

function span(text, marks = []) {
  return { _type: 'span', _key: key(), text, marks };
}

function bulletList(items) {
  return items.map(text => ({
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
  return items.map(text => ({
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

async function seed() {
  console.log('🌱 Seeding Sanity with blog post...\n');

  // 1. Find or create author
  let author = await client.fetch(`*[_type == "author"][0]{ _id, name }`);
  if (!author) {
    console.log('  Creating author...');
    author = await client.create({
      _type: 'author',
      name: 'SIM Finder Team',
      slug: { _type: 'slug', current: 'sim-finder-team' },
      bio: [textBlock('Expert team covering SIM verification, mobile security, and CNIC-related guides for Pakistan.')],
    });
    console.log(`  ✅ Author created: ${author.name}`);
  } else {
    console.log(`  ✅ Using existing author: ${author.name}`);
  }

  // 2. Find or create categories
  let guidesCategory = await client.fetch(`*[_type == "category" && title == "Guides"][0]{ _id }`);
  if (!guidesCategory) {
    console.log('  Creating "Guides" category...');
    guidesCategory = await client.create({
      _type: 'category',
      title: 'Guides',
      slug: { _type: 'slug', current: 'guides' },
      description: 'Step-by-step guides and tutorials',
    });
    console.log('  ✅ Category created: Guides');
  }

  let securityCategory = await client.fetch(`*[_type == "category" && title == "Security"][0]{ _id }`);
  if (!securityCategory) {
    console.log('  Creating "Security" category...');
    securityCategory = await client.create({
      _type: 'category',
      title: 'Security',
      slug: { _type: 'slug', current: 'security' },
      description: 'SIM and mobile security topics',
    });
    console.log('  ✅ Category created: Security');
  }

  // 3. Check if post already exists
  const existingPost = await client.fetch(
    `*[_type == "post" && slug.current == "sim-verification-pakistan-complete-guide"][0]{ _id }`
  );
  if (existingPost) {
    console.log('\n  ⚠️  Post already exists. Deleting and recreating...');
    await client.delete(existingPost._id);
  }

  // 4. Create the blog post with full Portable Text body
  const linkMarkKey = key();

  const body = [
    // --- Section 1: What is SIM Verification ---
    headingBlock('What is SIM Verification?', 'h2'),

    textBlock('SIM verification is the process of confirming that a SIM card is registered under the correct CNIC owner. This prevents fraud and ensures legal compliance with Pakistan Telecommunication Authority (PTA) regulations.'),

    textBlock('In Pakistan, every SIM card must be linked to a valid CNIC through biometric verification. This system was introduced to combat terrorism, fraud, and illegal activities conducted through unregistered mobile numbers.'),

    headingBlock('Why It Matters', 'h3'),

    ...bulletList([
      'Prevents identity theft and unauthorized use of your CNIC',
      'Improves national security by tracking SIM ownership',
      'Protects your CNIC from being used to register unknown numbers',
      'Avoids illegal SIM usage that could be traced back to you',
      'Ensures compliance with PTA regulations',
    ]),

    blockquoteBlock('Always verify your SIM regularly to ensure safety. The PTA recommends checking your registered SIMs at least once every 3 months.'),

    headingBlock('Legal Requirements', 'h3'),

    ...bulletList([
      'Biometric verification is mandatory for all new SIM activations',
      'Maximum of 5 SIMs allowed per CNIC (across all networks)',
      'Illegal or unverified SIMs are subject to immediate blocking',
      'Franchise owners face penalties for issuing SIMs without proper verification',
      'Re-verification may be required periodically by your network operator',
    ]),

    // --- Section 2: Step-by-Step Process ---
    headingBlock('Step-by-Step Process', 'h2'),

    textBlock('There are multiple ways to verify your SIM card registration in Pakistan. Below are the most common and reliable methods.'),

    headingBlock('Method 1: Online Check', 'h3'),

    textBlock('The easiest way to check how many SIMs are registered on your CNIC is through the PTA online portal or SMS service.'),

    ...numberedList([
      'Open the official SIM check portal or use the SIM Finder tool',
      'Enter your 13-digit CNIC number (without dashes)',
      'Click the Submit button to process your query',
      'View the complete list of SIMs registered against your CNIC',
      'Take note of any unrecognized numbers for blocking',
    ]),

    textBlock('Example CNIC format for verification:'),

    codeBlock('3520212345671', 'text'),

    headingBlock('Method 2: USSD Code', 'h3'),

    textBlock('You can also check your SIM registration status by dialing a USSD code directly from your phone. This works on all networks in Pakistan.'),

    textBlock('Dial the following code from your mobile phone:'),

    codeBlock('*336#', 'bash'),

    textBlock('After dialing, you will receive an SMS with the number of SIMs registered on your CNIC across all telecom operators (Jazz, Telenor, Zong, Ufone).'),

    headingBlock('Method 3: SMS Method', 'h3'),

    textBlock('Send an SMS with your CNIC number to 668. Here is the format:'),

    codeBlock('Send SMS to 668\nFormat: <your 13-digit CNIC number>\nExample: 3520212345671', 'text'),

    // --- Section 3: Understanding Results ---
    headingBlock('Understanding Your Results', 'h2'),

    textBlock('When you check your SIM registration, the results will show all SIMs registered under your CNIC. Here is what each field means:'),

    ...bulletList([
      'Network Name — The telecom operator (Jazz, Telenor, Zong, Ufone, SCO)',
      'Phone Number — The registered mobile number',
      'Status — Active, Suspended, or Blocked',
      'Registration Date — When the SIM was activated',
    ]),

    textBlock('If you find any number you do not recognize, you should immediately contact PTA or visit the nearest franchise to get it blocked.'),

    richTextBlock([
      span('You can check estimated costs and procedures on the '),
      span('PTA official website', [linkMarkKey]),
      span(' for detailed information.'),
    ], 'normal', [
      { _type: 'link', _key: linkMarkKey, href: 'https://www.pta.gov.pk' },
    ]),

    // --- Section 4: Network-Specific Codes ---
    headingBlock('Network-Specific Verification Codes', 'h2'),

    textBlock('Each network operator in Pakistan has its own USSD codes for SIM-related services:'),

    codeBlock(
      '# Jazz / Mobilink\n*336#     → Check SIMs on CNIC\n*111#     → Check own number\n\n# Telenor\n*336#     → Check SIMs on CNIC\n*345*88#  → Check own number\n\n# Zong\n*336#     → Check SIMs on CNIC\n*310#     → Check own number\n\n# Ufone\n*336#     → Check SIMs on CNIC\n*780#     → Check own number',
      'bash'
    ),

    // --- Section 5: Protecting Your SIM ---
    headingBlock('Protecting Your SIM', 'h2'),

    textBlock('SIM security is essential in today\'s digital world. Here are best practices to keep your SIM and mobile identity safe:'),

    ...bulletList([
      'Never share your CNIC with unknown people or unverified vendors',
      'Always buy SIM cards from official franchise outlets only',
      'Block any unknown SIMs registered on your CNIC immediately',
      'Verify your SIM registration at least once every quarter',
      'Enable SIM lock/PIN on your device for additional security',
      'Report lost or stolen SIMs to your operator within 24 hours',
      'Use two-factor authentication on accounts linked to your number',
    ]),

    headingBlock('What to Do If You Find Unauthorized SIMs', 'h3'),

    ...numberedList([
      'Note down the unauthorized phone number(s)',
      'Visit the nearest franchise of the respective network',
      'Bring your original CNIC for identity verification',
      'Request immediate blocking of the unauthorized SIM',
      'File a complaint with PTA if the franchise does not cooperate',
      'Consider filing an FIR if you suspect identity theft',
    ]),

    blockquoteBlock('Pro Tip: Always keep a record of your legitimate SIM numbers. This makes it easier to identify unauthorized registrations during periodic checks.'),

    // --- Section 6: FAQ ---
    headingBlock('Frequently Asked Questions', 'h2'),

    headingBlock('How many SIMs can I have on one CNIC?', 'h3'),
    textBlock('According to PTA regulations, a maximum of 5 SIMs can be registered per CNIC across all telecom operators in Pakistan.'),

    headingBlock('Is SIM verification free?', 'h3'),
    textBlock('Yes, checking your SIM registration via *336# or SMS to 668 is completely free of charge on all networks.'),

    headingBlock('Can someone register a SIM on my CNIC without my knowledge?', 'h3'),
    textBlock('With biometric verification in place, it is very difficult but not impossible. Some cases of fraud at unauthorized retail points have been reported. Regular verification helps catch such issues early.'),
  ];

  // 5. Create the post
  console.log('\n  Creating blog post...');
  const post = await client.create({
    _type: 'post',
    title: 'What is SIM Verification in Pakistan – Complete Guide',
    slug: { _type: 'slug', current: 'sim-verification-pakistan-complete-guide' },
    author: { _type: 'reference', _ref: author._id },
    categories: [
      { _type: 'reference', _ref: guidesCategory._id, _key: key() },
      { _type: 'reference', _ref: securityCategory._id, _key: key() },
    ],
    publishedAt: new Date().toISOString(),
    excerpt: 'Learn how to verify your SIM card registration in Pakistan, check CNIC-linked numbers, understand PTA regulations, and protect your mobile identity.',
    seoTitle: 'SIM Verification Pakistan - Complete Guide 2024 | Check CNIC SIMs',
    seoDescription: 'Step-by-step guide to verify SIM cards registered on your CNIC in Pakistan. Check via *336#, SMS, or online. Protect your identity today.',
    body,
  });

  console.log(`  ✅ Post created: "${post.title}"`);
  console.log(`\n🎉 Done! View your post at:`);
  console.log(`   Blog:   http://localhost:3000/blog/sim-verification-pakistan-complete-guide`);
  console.log(`   Studio: http://localhost:3000/studio/structure/post;${post._id}\n`);
}

seed().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
