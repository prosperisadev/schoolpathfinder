import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, sql } from "drizzle-orm";
import * as schema from "../db/schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL environment variable is not set");
  process.exit(1);
}

const client = postgres(connectionString, {
  prepare: false,
  ssl: { rejectUnauthorized: false },
});
const db = drizzle(client, { schema });

// 100 Access Codes
const ACCESS_CODES = [
  "TE3BWHHULREV", "YTPPQF0TUTR3", "UF3FI11VRJJ4", "MCF9CFPZIBW5",
  "XGQWAR8AEWU8", "WQYMLXBNEG7U", "530EZ9K5H1ME", "8LYET27JC5VM",
  "RKWB3W0Y81L1", "CEWDOEO0WXVB", "PIOI4HNRC9B2", "CQEZNCL7B13J",
  "LAV3CNFDMEYZ", "2UG1A6VXQLR4", "TMQSCLD0YTGP", "J7KF36SU4HGE",
  "0UAIMXL61WEW", "JMOG08V6BK8T", "CZW4MGVOMXMY", "1LX5BTPMRNQC",
  "Q1NFT9HGOJ2J", "MKBQ7IVA0DEQ", "OXUIQRBH4EAL", "6C217YN38G1P",
  "VVYRLJB5KQVU", "DKTRFZF7BB6B", "MY93MG8TWZ6R", "E45W2HCCDSX9",
  "8VRR2HDW1ARJ", "8P8B1IY5C5H3", "9PKCCOQWSVNS", "7CT2Z0NVFQKV",
  "CJV8ZTY6ZKWV", "DYAANJVL4GHB", "LTRG4EBO9H3P", "OJOX0S8KX83V",
  "J0FAHPHIILCQ", "GGKYZ7SR2YI8", "9ZOV70KVLJ4J", "1DQ23QMT7Y2I",
  "BOAL5NAMV5I7", "S9ISBBGYQUL7", "K5TW3NXRHP3F", "BB3PB1ZFQIEX",
  "QURKDZEQNF5F", "PP38VJKODGT5", "3XDN27US2BUE", "TQ7YM7UPK7UP",
  "0YJC9AJTZ061", "Y330LGPG85YX", "DB16YFEVK2MS", "2U3KP0PGLNJX",
  "IC3VQ3M5WWE0", "Y4KXJU435496", "OSA6RPMSGFB0", "NGMT0W0NEX21",
  "NE261ICP1F5C", "KFSH9XP23S5T", "6XTZ4MTBY7WD", "LYMRFL13DJNT",
  "H04OKT2458F3", "N45AG3FO08M8", "WW4VZJ6N91PA", "P08ZZWYEGC1D",
  "MDMGNK41MBS2", "DXYP3RZ5INL0", "ZV9HP622IGNX", "TXYH70F6SMN8",
  "VA5A6W66CYE8", "CU60HCSHUOQ5", "ILG4PDZ3YATY", "FDDN3GIN6PJW",
  "ADCJ251350M6", "OISG4AX8FDNV", "Q96C2ZN5BW25", "FKYN84YA4UWP",
  "0LT1AU6DOJZ8", "HPTHTCQQTBO2", "SYOT1EA9G2A5", "3J24Q3DNKNT6",
  "PKH3VG3HMSFH", "2YJYTM3SAHX6", "MLVH2JU2K59F", "JJ4XTX5VDX39",
  "91406FFY5QYR", "Y6143XSNTOYW", "H075DFD7XGWZ", "8KJI903EGXYW",
  "BNBAY97C2340", "CABY07B6KFYF", "IFVUDGQOYUOC", "R9ZU9C0WHOXE",
  "OMWCX6OUZZA8", "ILH44RU25ORR", "VNK4LVA879V9", "W3IJOULVWNK0",
  "JOIH0N2YIYM0", "HWP38QZ8V65O", "YVAVECRLN8QN", "22G6QBJG43B2",
];

// 11 Nigerian Universities
const UNIVERSITIES = [
  { name: "University of Lagos (UNILAG)", country: "Nigeria", region: "West Africa", globalRank: 1201, regionalRank: 68, countryRank: 1, rankingScore: "94.5", description: "Lagos-based leading university with strong STEM and social sciences programs", website: "www.unilag.edu.ng", establishedYear: 1962 },
  { name: "University of Ibadan (UI)", country: "Nigeria", region: "West Africa", globalRank: 1201, regionalRank: 72, countryRank: 2, rankingScore: "93.8", description: "Oldest university in Nigeria with prestigious medicine and law programs", website: "www.ui.edu.ng", establishedYear: 1948 },
  { name: "Covenant University", country: "Nigeria", region: "West Africa", globalRank: 3001, regionalRank: 180, countryRank: 3, rankingScore: "89.2", description: "Private university in Ogun State with strong engineering and IT programs", website: "www.covenantuniversity.edu.ng", establishedYear: 2002 },
  { name: "Ahmadu Bello University (ABU)", country: "Nigeria", region: "West Africa", globalRank: 1501, regionalRank: 85, countryRank: 4, rankingScore: "88.5", description: "Northern Nigeria's premier university with excellent agriculture and engineering", website: "www.abu.edu.ng", establishedYear: 1962 },
  { name: "University of Nigeria, Nsukka (UNN)", country: "Nigeria", region: "West Africa", globalRank: 1801, regionalRank: 95, countryRank: 5, rankingScore: "87.2", description: "First autonomous university in Nigeria with strong pharmacy and law programs", website: "www.unn.edu.ng", establishedYear: 1960 },
  { name: "University of Benin (UNIBEN)", country: "Nigeria", region: "West Africa", globalRank: 2001, regionalRank: 110, countryRank: 6, rankingScore: "85.8", description: "Leading South-South university with excellent medicine and law programs", website: "www.uniben.edu.ng", establishedYear: 1970 },
  { name: "Obafemi Awolowo University (OAU)", country: "Nigeria", region: "West Africa", globalRank: 1601, regionalRank: 88, countryRank: 7, rankingScore: "86.5", description: "Beautiful Ife campus with strong science and humanities programs", website: "www.oauife.edu.ng", establishedYear: 1962 },
  { name: "Lagos State University (LASU)", country: "Nigeria", region: "West Africa", globalRank: 2501, regionalRank: 140, countryRank: 8, rankingScore: "82.3", description: "State university with strong business and education programs", website: "www.lasu.edu.ng", establishedYear: 1983 },
  { name: "University of Ilorin (UNILORIN)", country: "Nigeria", region: "West Africa", globalRank: 2201, regionalRank: 125, countryRank: 9, rankingScore: "84.1", description: "Known for academic stability and strong engineering programs", website: "www.unilorin.edu.ng", establishedYear: 1975 },
  { name: "Federal University of Technology, Minna (FUTMINNA)", country: "Nigeria", region: "West Africa", globalRank: 3501, regionalRank: 200, countryRank: 10, rankingScore: "80.5", description: "Technology-focused university with excellent engineering programs", website: "www.futminna.edu.ng", establishedYear: 1983 },
  { name: "Federal University of Technology, Akure (FUTA)", country: "Nigeria", region: "West Africa", globalRank: 3201, regionalRank: 190, countryRank: 11, rankingScore: "81.2", description: "Premier technology university with strong software engineering", website: "www.futa.edu.ng", establishedYear: 1981 },
];

// Course offerings per university
const COURSE_OFFERINGS = [
  // UNILAG
  { universityName: "UNILAG", courses: [
    { courseId: "computer-science", score: "95", strength: "Top CS program in Nigeria", year: 1975 },
    { courseId: "medicine", score: "94", strength: "Premier medical school", year: 1962 },
    { courseId: "law", score: "92", strength: "Leading law faculty", year: 1965 },
    { courseId: "engineering", score: "93", strength: "Comprehensive engineering programs", year: 1964 },
    { courseId: "business-administration", score: "91", strength: "Top business school", year: 1970 },
    { courseId: "economics", score: "90", strength: "Strong economics department", year: 1968 },
  ]},
  // UI
  { universityName: "Ibadan", courses: [
    { courseId: "medicine", score: "96", strength: "Oldest and most prestigious medical school", year: 1948 },
    { courseId: "law", score: "93", strength: "Historic law faculty", year: 1961 },
    { courseId: "agriculture", score: "94", strength: "Leading agricultural research", year: 1949 },
    { courseId: "nursing", score: "91", strength: "Top nursing program", year: 1965 },
  ]},
  // Covenant
  { universityName: "Covenant", courses: [
    { courseId: "computer-science", score: "92", strength: "Modern IT infrastructure", year: 2002 },
    { courseId: "software-engineering", score: "93", strength: "Industry-focused curriculum", year: 2005 },
    { courseId: "electrical-engineering", score: "90", strength: "Strong electrical program", year: 2003 },
  ]},
  // ABU
  { universityName: "Ahmadu Bello", courses: [
    { courseId: "medicine", score: "91", strength: "Northern Nigeria's best medical school", year: 1967 },
    { courseId: "agriculture", score: "93", strength: "Extensive agricultural programs", year: 1962 },
    { courseId: "engineering", score: "90", strength: "Strong engineering faculty", year: 1965 },
  ]},
  // UNN
  { universityName: "Nsukka", courses: [
    { courseId: "pharmacy", score: "94", strength: "Top pharmacy program", year: 1967 },
    { courseId: "law", score: "91", strength: "Respected law faculty", year: 1962 },
    { courseId: "computer-science", score: "88", strength: "Growing CS department", year: 1985 },
  ]},
  // UNIBEN
  { universityName: "Benin", courses: [
    { courseId: "medicine", score: "92", strength: "Excellent medical training", year: 1973 },
    { courseId: "law", score: "90", strength: "Strong law program", year: 1975 },
    { courseId: "pharmacy", score: "89", strength: "Quality pharmacy training", year: 1980 },
  ]},
  // OAU
  { universityName: "Awolowo", courses: [
    { courseId: "medicine", score: "93", strength: "Renowned medical faculty", year: 1972 },
    { courseId: "pharmacy", score: "91", strength: "Leading pharmacy school", year: 1975 },
    { courseId: "computer-science", score: "89", strength: "Good CS program", year: 1982 },
  ]},
  // LASU
  { universityName: "Lagos State", courses: [
    { courseId: "business-administration", score: "88", strength: "Strong business focus", year: 1984 },
    { courseId: "law", score: "86", strength: "Growing law faculty", year: 1990 },
    { courseId: "mass-communication", score: "87", strength: "Good media program", year: 1988 },
  ]},
  // UNILORIN
  { universityName: "Ilorin", courses: [
    { courseId: "medicine", score: "89", strength: "Quality medical training", year: 1980 },
    { courseId: "engineering", score: "90", strength: "Stable engineering programs", year: 1978 },
    { courseId: "law", score: "88", strength: "Developing law faculty", year: 1985 },
  ]},
  // FUTMINNA
  { universityName: "Minna", courses: [
    { courseId: "computer-science", score: "88", strength: "Technology focus", year: 1990 },
    { courseId: "electrical-engineering", score: "89", strength: "Strong electrical program", year: 1988 },
    { courseId: "mechanical-engineering", score: "87", strength: "Good mechanical engineering", year: 1988 },
  ]},
  // FUTA
  { universityName: "Akure", courses: [
    { courseId: "software-engineering", score: "90", strength: "Software engineering specialization", year: 2000 },
    { courseId: "computer-science", score: "89", strength: "Strong CS foundation", year: 1985 },
    { courseId: "electrical-engineering", score: "88", strength: "Quality electrical program", year: 1983 },
  ]},
];

async function seed() {
  console.log("🌱 Starting database seed...\n");

  try {
    // 1. Seed Access Codes
    console.log("📝 Inserting 100 access codes...");
    const accessCodeData = ACCESS_CODES.map((code) => ({ code }));
    
    await db.insert(schema.accessCodesBank)
      .values(accessCodeData)
      .onConflictDoNothing();
    
    console.log("✅ Access codes inserted\n");

    // 2. Seed Universities
    console.log("🏛️ Inserting 11 Nigerian universities...");
    
    for (const uni of UNIVERSITIES) {
      await db.insert(schema.universitiesComprehensive)
        .values(uni)
        .onConflictDoNothing();
    }
    
    console.log("✅ Universities inserted\n");

    // 3. Seed Course Offerings
    console.log("📚 Inserting course offerings...");
    
    for (const offering of COURSE_OFFERINGS) {
      // Find university by name pattern using SQL ILIKE
      const [university] = await db
        .select()
        .from(schema.universitiesComprehensive)
        .where(sql`${schema.universitiesComprehensive.name} ILIKE ${'%' + offering.universityName + '%'}`)
        .limit(1);

      if (university) {
        for (const course of offering.courses) {
          await db.insert(schema.universityCourseOfferings)
            .values({
              universityId: university.id,
              courseId: course.courseId,
              isAvailable: true,
              courseRankingScore: course.score,
              programStrength: course.strength,
              yearEstablished: course.year,
            })
            .onConflictDoNothing();
        }
        console.log(`  ✓ ${offering.universityName}: ${offering.courses.length} courses`);
      }
    }
    
    console.log("\n✅ Course offerings inserted");

    // Summary
    console.log("\n" + "=".repeat(50));
    console.log("🎉 DATABASE SEED COMPLETE!");
    console.log("=".repeat(50));
    console.log(`✅ 100 access codes ready`);
    console.log(`✅ 11 universities added`);
    console.log(`✅ Course offerings linked`);
    console.log("\n📌 Test with code: TE3BWHHULREV");

  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error;
  } finally {
    await client.end();
  }
}

seed().catch(console.error);
