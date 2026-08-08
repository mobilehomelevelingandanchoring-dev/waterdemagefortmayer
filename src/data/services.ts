export interface ServiceStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  headline: string;
  tagline: string;
  icon: string;
  heroDescription: string;
  description: string;
  features: string[];
  process: ServiceStep[];
  faqs: ServiceFaq[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "water-damage-restoration",
    title: "Water Damage Restoration",
    headline: "Water Damage Restoration in Fort Myers, FL",
    tagline: "Fast, certified water damage cleanup — 24/7 emergency response across Lee County.",
    icon: "Droplets",
    heroDescription:
      "Water damage restoration is the process of drying, cleaning, and repairing a property after a water intrusion event — whether from a burst pipe, appliance failure, roof leak, or flooding. A certified restoration team extracts standing water, uses industrial drying equipment to eliminate moisture from walls, floors, and ceilings, and monitors the structure until it reaches safe moisture levels. Acting within the first few hours dramatically reduces the risk of secondary damage like mold growth and structural deterioration.",
    description:
      "Fort Myers homeowners face water damage risks year-round — from summer storm surges along the Caloosahatchee River to plumbing failures in older neighborhoods like Dunbar and McGregor. At Royal Water Damage, we respond to calls 24 hours a day because we know the first 24 hours are critical. Southwest Florida's heat and humidity mean that moisture left standing even overnight can begin supporting mold colonization, turning a manageable repair into a much costlier remediation project. Our IICRC-certified technicians bring commercial-grade extractors, air movers, and dehumidifiers directly to your door — stopping the damage clock before it runs out.",
    features: [
      "24/7 emergency response — crews on call every night of the year",
      "Industrial water extraction with truck-mounted and portable units",
      "Thermal imaging to locate hidden moisture in walls and subfloors",
      "Structural drying monitored to IICRC S500 standards",
      "Full documentation for insurance claims",
      "Direct coordination with all major insurance carriers",
    ],
    process: [
      {
        step: 1,
        title: "Emergency Contact & Dispatch",
        description:
          "Call us any time — day or night. We answer live, assess your situation over the phone, and dispatch a certified crew to your Fort Myers property, typically within 60 minutes.",
      },
      {
        step: 2,
        title: "Water Extraction & Assessment",
        description:
          "Our technicians use moisture meters and thermal cameras to map all affected areas, then extract standing water with high-capacity equipment. We document everything for your insurance adjuster.",
      },
      {
        step: 3,
        title: "Structural Drying & Monitoring",
        description:
          "We place industrial air movers and dehumidifiers in a calculated pattern, then return daily to take moisture readings. Drying typically takes 3–5 days in Fort Myers conditions.",
      },
      {
        step: 4,
        title: "Restoration & Final Inspection",
        description:
          "Once moisture levels meet industry standards, we restore affected materials — replacing drywall, flooring, and insulation as needed — and perform a final walkthrough to verify your home is safe and dry.",
      },
    ],
    faqs: [
      {
        question: "How long does water damage restoration take in Fort Myers?",
        answer:
          "Structural drying typically takes 3 to 5 days in Southwest Florida, though larger losses or properties with multiple affected rooms can take longer. After drying is complete, reconstruction work (replacing drywall, flooring, cabinets) adds additional time depending on the scope. We provide a timeline estimate after our initial assessment.",
      },
      {
        question: "Will my homeowner's insurance cover water damage?",
        answer:
          "Most standard Florida homeowner's policies cover sudden and accidental water damage — like a burst pipe or appliance malfunction — but exclude flood damage from external water sources. Flood damage requires a separate NFIP or private flood policy. We work directly with your insurance company and provide all the documentation they need.",
      },
      {
        question: "What should I do immediately after water damage in my home?",
        answer:
          "First, if it's safe, shut off the water source and cut power to affected rooms. Remove valuables and move furniture off wet flooring if you can. Do not use a household vacuum to remove water and avoid running fans until a professional assesses the situation — improper airflow can spread contamination. Call a certified restoration company as soon as possible.",
      },
      {
        question: "Can water damage cause mold in Fort Myers?",
        answer:
          "Yes — and in Fort Myers specifically, the risk is accelerated. With ambient temperatures often above 80°F and relative humidity regularly exceeding 70%, mold can begin colonizing wet building materials within 24 to 48 hours. This is why rapid response matters so much in Southwest Florida compared to drier climates.",
      },
      {
        question: "How much does water damage restoration cost?",
        answer:
          "Cost varies widely based on the size of the affected area, the water category (clean water vs. sewage), and how long the damage has been present. Minor jobs may run $1,500–$3,000 while larger losses involving multiple rooms or structural drying can reach $10,000 or more. We provide a detailed written estimate before work begins, and we bill insurance directly whenever possible.",
      },
    ],
    metaTitle: "Water Damage Restoration Fort Myers FL | 24/7",
    metaDescription:
      "Royal Water Damage provides 24/7 water damage restoration in Fort Myers, FL. IICRC-certified crews, fast response, direct insurance billing. Call (864) 734-5702.",
    keywords: [
      "water damage restoration Fort Myers",
      "water damage Fort Myers FL",
      "emergency water damage Fort Myers",
      "water damage repair Fort Myers",
      "flood cleanup Fort Myers",
      "Lee County water damage",
    ],
  },
  {
    slug: "mold-remediation",
    title: "Mold Remediation",
    headline: "Mold Remediation in Fort Myers, FL",
    tagline: "Safe, certified mold removal that keeps your family protected in Florida's humid climate.",
    icon: "Wind",
    heroDescription:
      "Mold remediation is the controlled process of identifying, containing, and removing mold growth from a home or building, then addressing the underlying moisture source that caused it. Unlike simple surface cleaning, professional remediation uses negative air pressure, HEPA filtration, and EPA-registered biocides to eliminate colonies without cross-contaminating clean areas of the structure. In Fort Myers and the broader Southwest Florida region, where year-round heat and humidity create near-ideal conditions for mold, proper remediation is essential to protecting indoor air quality and structural integrity.",
    description:
      "Fort Myers sits in one of the most mold-prone climates in the United States. Average humidity hovers between 70% and 80% for much of the year, and after hurricanes like Ian in 2022, thousands of Lee County homes were left with wet materials that went unaddressed long enough for mold colonies to take hold. Royal Water Damage's remediation team holds current IICRC AMRT certifications and follows the IICRC S520 standard for mold remediation — the same protocol that insurance adjusters and industrial hygienists reference when evaluating a job. We don't just spray and wipe; we contain the affected area, protect your HVAC system, remove compromised materials, and verify clearance with post-remediation testing.",
    features: [
      "IICRC AMRT-certified mold remediation technicians",
      "Air quality testing before and after remediation",
      "Containment barriers and negative air pressure to prevent spread",
      "Safe removal and disposal of contaminated drywall, insulation, and framing",
      "HEPA vacuuming and EPA-registered antimicrobial treatment",
      "Written clearance report upon project completion",
    ],
    process: [
      {
        step: 1,
        title: "Mold Inspection & Air Sampling",
        description:
          "We inspect the property visually and use moisture meters to locate both visible and hidden mold. Air and surface samples are collected when needed to identify species and concentration levels.",
      },
      {
        step: 2,
        title: "Containment Setup",
        description:
          "We seal the affected area with poly sheeting and establish negative air pressure using HEPA-filtered air scrubbers so mold spores cannot migrate to unaffected rooms during removal.",
      },
      {
        step: 3,
        title: "Removal & Treatment",
        description:
          "Contaminated materials are carefully removed, bagged, and disposed of per EPA guidelines. Remaining structural surfaces are HEPA-vacuumed and treated with EPA-registered antimicrobials.",
      },
      {
        step: 4,
        title: "Post-Remediation Verification",
        description:
          "After work is complete, we conduct clearance testing — or facilitate third-party testing — to confirm mold counts have returned to acceptable ambient levels before containment is removed.",
      },
    ],
    faqs: [
      {
        question: "How do I know if I have mold in my Fort Myers home?",
        answer:
          "Common signs include a musty or earthy odor, visible dark staining on walls, ceilings, or grout, allergy-like symptoms that improve when you leave the house, and a history of water damage or leaks. In Fort Myers, mold often hides inside walls near leaking windows and in attic spaces where high temperatures push condensation into the sheathing. If you suspect mold, a professional inspection is the safest next step.",
      },
      {
        question: "Can I remove mold myself with bleach?",
        answer:
          "Bleach can kill surface mold on non-porous materials, but it doesn't penetrate porous surfaces like drywall, wood framing, or grout — which is where mold roots (hyphae) live. Attempting DIY removal on large areas can also disturb colonies and release millions of spores into your living space. Florida DEP recommends professional remediation for any mold area larger than 10 square feet.",
      },
      {
        question: "How long does mold remediation take?",
        answer:
          "A typical residential remediation project in Fort Myers takes 1 to 5 days depending on the size of the affected area. Small isolated patches can be completed in a day; larger losses affecting multiple rooms or an entire attic may require a week, especially if structural drying is needed before work can begin.",
      },
      {
        question: "Will mold come back after remediation?",
        answer:
          "Mold will not return if the underlying moisture source has been corrected. If a leak is repaired and the structure is properly dried before remediation, recurrence is extremely unlikely. However, if humidity problems, leaks, or poor ventilation are left unaddressed, new mold growth can appear even after professional removal.",
      },
      {
        question: "Does homeowner's insurance cover mold remediation in Florida?",
        answer:
          "Florida homeowner's policies vary significantly. Most cover mold remediation only when it results directly from a covered water loss — for example, mold that grew because of a burst pipe. They typically exclude mold caused by long-term leaks, condensation, or homeowner neglect. We review the cause-of-loss with you and help document the claim appropriately.",
      },
    ],
    metaTitle: "Mold Remediation Fort Myers FL | IICRC Certified",
    metaDescription:
      "Certified mold remediation in Fort Myers, FL by Royal Water Damage. HEPA containment, air testing, and clearance reports. Serving Lee County. Call (864) 734-5702.",
    keywords: [
      "mold remediation Fort Myers",
      "mold removal Fort Myers FL",
      "black mold removal Fort Myers",
      "mold inspection Fort Myers",
      "mold testing Fort Myers",
      "Lee County mold remediation",
    ],
  },
  {
    slug: "fire-damage-restoration",
    title: "Fire & Smoke Damage Restoration",
    headline: "Fire and Smoke Damage Restoration in Fort Myers, FL",
    tagline: "Comprehensive fire, smoke, and soot cleanup to bring your home back to life.",
    icon: "Flame",
    heroDescription:
      "Fire and smoke damage restoration involves the systematic removal of soot, char, and smoke residue from a structure, followed by odor elimination, structural cleaning, and reconstruction. Smoke penetrates far beyond the burn zone — embedding in insulation, ductwork, and soft furnishings throughout the home — so professional restoration requires specialized equipment and chemistry to fully neutralize odors and prevent long-term health effects. The process also addresses secondary water damage left by firefighting efforts, making it one of the most complex residential restoration scenarios.",
    description:
      "After a fire, Fort Myers homeowners face a cascade of interrelated problems: soot that etches surfaces within hours, smoke odors that saturate drywall and framing, and water damage from suppression efforts. Our team understands that time is doubly critical here — smoke residue becomes chemically bonded to surfaces the longer it sits, and Florida's humidity accelerates rust and corrosion of metal fixtures and appliances. Royal Water Damage's fire restoration crew coordinates every phase of recovery, from initial board-up and roof tarping to content pack-out, structural cleaning, odor neutralization with thermal fogging and hydroxyl generators, and final reconstruction. We work alongside your insurance adjuster from day one to keep the claims process moving.",
    features: [
      "Emergency board-up and roof tarping to secure the property",
      "Structural soot and smoke cleaning using dry and wet methods",
      "Content pack-out, cleaning, and storage of salvageable belongings",
      "Thermal fogging and hydroxyl generator odor neutralization",
      "HVAC cleaning to prevent smoke odor recirculation",
      "Full reconstruction from drywall and paint to cabinetry and flooring",
    ],
    process: [
      {
        step: 1,
        title: "Emergency Securing & Assessment",
        description:
          "We board up windows and doors, tarp damaged roofing, and perform a complete damage assessment — categorizing materials that can be restored versus those that must be replaced. A detailed scope is provided to your insurance company.",
      },
      {
        step: 2,
        title: "Content Pack-Out & Soot Removal",
        description:
          "Salvageable contents are catalogued, packed, and transported to our cleaning facility. Structural surfaces are cleaned using the appropriate method for each material type — dry chemical sponges for soot, wet cleaning for painted surfaces.",
      },
      {
        step: 3,
        title: "Odor Neutralization",
        description:
          "After surfaces are clean, thermal foggers or hydroxyl generators penetrate the same pathways smoke traveled to chemically neutralize odor molecules — not just mask them. HVAC systems are cleaned and treated separately.",
      },
      {
        step: 4,
        title: "Reconstruction & Restoration",
        description:
          "We rebuild the damaged structure — replacing drywall, insulation, flooring, and trim — and return cleaned contents to the home. A final air quality check confirms odors have been eliminated before project close.",
      },
    ],
    faqs: [
      {
        question: "What should I do right after a house fire in Fort Myers?",
        answer:
          "Do not re-enter until the fire marshal has cleared the structure. Once cleared, call your insurance company to file a claim, then contact a certified restoration company immediately. Soot begins chemically etching countertops, metal fixtures, and glass within hours — the faster a crew begins mitigation, the more of your home can be saved.",
      },
      {
        question: "Can smoke smell be completely removed from a house?",
        answer:
          "Yes, when proper professional techniques are used. Surface cleaning alone is not enough — smoke odors live in structural cavities, insulation, and HVAC ductwork. Thermal fogging and hydroxyl generation reach these hidden areas and chemically break down odor molecules. When combined with thorough structural cleaning, complete odor elimination is achievable in most cases.",
      },
      {
        question: "How long does fire damage restoration take?",
        answer:
          "Small kitchen fires with contained smoke damage may be resolved in a week. More extensive fires affecting multiple rooms or the structure's framing can take 4 to 12 weeks, depending on the reconstruction scope. Your restoration company will provide a detailed timeline after the initial assessment.",
      },
      {
        question: "Does homeowner's insurance cover fire damage in Florida?",
        answer:
          "Yes — fire is one of the most consistently covered perils under standard Florida homeowner's policies. Your policy should cover structural damage, smoke damage, water damage from firefighting, and loss of personal property. We document the full scope of damage and work directly with your adjuster to ensure nothing is overlooked in the claim.",
      },
      {
        question: "Is it safe to stay in my house after a small fire?",
        answer:
          "It depends on the location and extent of damage. Even after a small fire, soot particles and combustion byproducts in the air pose respiratory and health risks, especially for children and anyone with asthma or other lung conditions. If there's visible soot in areas beyond the burn zone, staying elsewhere until professional cleaning is complete is the safest choice.",
      },
    ],
    metaTitle: "Fire & Smoke Damage Restoration Fort Myers FL",
    metaDescription:
      "Fire and smoke damage restoration in Fort Myers, FL. Board-up, soot cleaning, odor removal, and reconstruction. Royal Water Damage — call (864) 734-5702.",
    keywords: [
      "fire damage restoration Fort Myers",
      "smoke damage repair Fort Myers",
      "fire restoration Fort Myers FL",
      "soot removal Fort Myers",
      "fire damage cleanup Lee County",
      "fire damage company Fort Myers",
    ],
  },
  {
    slug: "sewage-cleanup",
    title: "Sewage & Biohazard Cleanup",
    headline: "Sewage & Biohazard Cleanup in Fort Myers, FL",
    tagline: "Safe, discreet biohazard cleanup handled by trained technicians — fully licensed and insured.",
    icon: "AlertTriangle",
    heroDescription:
      "Sewage cleanup is the process of safely removing, disinfecting, and restoring areas contaminated by raw sewage, blackwater, or other biohazardous materials. Because sewage contains harmful pathogens — including bacteria like E. coli and Salmonella, viruses, and parasites — it is classified as Category 3 water damage and requires professional handling with full personal protective equipment, EPA-registered disinfectants, and proper waste disposal protocols. Attempting to clean sewage contamination without professional training and equipment creates serious health risks for occupants and cleanup workers alike.",
    description:
      "Sewage backups are one of the most urgent and health-threatening situations a Fort Myers homeowner can face. Aging sewer infrastructure, heavy storm events that overwhelm the municipal system, and tree root intrusion into lateral lines are all common causes in Lee County. When raw sewage enters a living space, every porous material it contacts — flooring, drywall, cabinetry — becomes a biohazard and must be treated or removed. Royal Water Damage's technicians are trained in biohazard cleanup protocols, wear full PPE during every job, and use hospital-grade disinfectants to restore the affected area to a safe, habitable condition. We handle disposal of contaminated materials in accordance with Florida Department of Health regulations and document the entire scope for your insurance claim.",
    features: [
      "24/7 emergency response to sewage backups and overflows",
      "Full personal protective equipment for all crew members",
      "Complete extraction and removal of sewage and contaminated water",
      "Removal and disposal of all Category 3-contaminated materials",
      "Hospital-grade disinfection with EPA-registered antimicrobials",
      "Deodorization and air scrubbing to restore safe indoor air quality",
    ],
    process: [
      {
        step: 1,
        title: "Safety Assessment & Containment",
        description:
          "Our crew arrives in full PPE, assesses the extent of contamination, shuts off utilities if needed, and establishes a containment zone to prevent sewage from spreading to unaffected areas of the home.",
      },
      {
        step: 2,
        title: "Extraction & Material Removal",
        description:
          "Standing sewage and contaminated water are extracted using specialized equipment. All porous materials — flooring, drywall, insulation — that absorbed Category 3 water are removed and disposed of in accordance with Florida Department of Health guidelines.",
      },
      {
        step: 3,
        title: "Disinfection & Deodorization",
        description:
          "All structural surfaces in the affected area are thoroughly cleaned, then treated with EPA-registered hospital-grade disinfectants. Industrial air scrubbers with HEPA and carbon filters run to eliminate airborne pathogens and odors.",
      },
      {
        step: 4,
        title: "Drying, Restoration & Clearance",
        description:
          "The area is dried to IICRC standards, then restored with new materials. We provide documentation of the cleanup process and confirm the space meets safe re-occupancy standards before closing the job.",
      },
    ],
    faqs: [
      {
        question: "Is sewage backup covered by homeowner's insurance in Florida?",
        answer:
          "Standard Florida homeowner's policies typically do not cover sewage backup unless you've added a specific water or sewer backup endorsement rider. However, if the backup was caused by a covered event — such as storm flooding — your policy may respond differently. We always recommend reviewing your policy with your agent and can provide detailed documentation to support your claim.",
      },
      {
        question: "How dangerous is sewage water in your home?",
        answer:
          "Raw sewage is classified as Category 3 or 'blackwater' — the most dangerous category of water contamination. It contains active pathogens including E. coli, Hepatitis A, Salmonella, and Cryptosporidium. Even brief exposure can cause serious illness. Children, elderly individuals, and anyone immunocompromised are especially vulnerable. No one should enter a sewage-affected space without proper PPE.",
      },
      {
        question: "What causes sewage to back up into a house?",
        answer:
          "The most common causes in Fort Myers are: blockages in the home's lateral sewer line (often from grease buildup or tree root intrusion), municipal sewer system overloads during heavy rain events, and failures in septic systems for homes in unincorporated Lee County. Older neighborhoods with cast iron or clay pipe are particularly prone to root intrusion.",
      },
      {
        question: "Can I clean up sewage backup myself?",
        answer:
          "We strongly advise against it. Without proper PPE, appropriate disinfectants, and the ability to safely dispose of contaminated materials, DIY sewage cleanup creates significant health risks and may leave hidden contamination that causes long-term problems including mold growth and lingering pathogens. The health liability is not worth the cost savings.",
      },
      {
        question: "How long does sewage cleanup take?",
        answer:
          "Most residential sewage backup cleanups are completed within 1 to 3 days, covering extraction, material removal, disinfection, and initial drying. If significant reconstruction is needed — replacing flooring, lower sections of drywall, or cabinetry — additional time for rebuilding follows. We provide a clear timeline at the start of every job.",
      },
    ],
    metaTitle: "Sewage Cleanup Fort Myers FL | Biohazard Removal",
    metaDescription:
      "Professional sewage and biohazard cleanup in Fort Myers, FL. Safe Category 3 water removal, EPA-grade disinfection. Royal Water Damage — (864) 734-5702.",
    keywords: [
      "sewage cleanup Fort Myers",
      "sewage backup cleanup Fort Myers FL",
      "biohazard cleanup Fort Myers",
      "sewage removal Lee County",
      "blackwater cleanup Fort Myers",
      "sewage damage restoration Fort Myers",
    ],
  },
  {
    slug: "basement-flood-cleanup",
    title: "Basement & Flood Cleanup",
    headline: "Basement & Flood Cleanup in Fort Myers, FL",
    tagline: "Rapid flood cleanup for Fort Myers homes — stopping damage before it compounds.",
    icon: "Waves",
    heroDescription:
      "Basement and flood cleanup involves the rapid removal of floodwater, drying of affected structural materials, and restoration of the space to a safe, usable condition. While true basements are uncommon in Fort Myers due to the region's high water table, ground-level flooding of utility rooms, garages, and lower living spaces is a frequent event during hurricane season and heavy rain events near the Caloosahatchee River. Professional flood cleanup addresses not just standing water but hidden moisture in concrete, block walls, and slab systems that standard household equipment cannot reach.",
    description:
      "Fort Myers and Lee County sit in one of the most flood-vulnerable regions in the United States. Hurricane Ian's catastrophic storm surge in September 2022 inundated thousands of homes — many of which had never flooded before — and dramatically illustrated how quickly floodwater can compromise a structure. Even without a named storm, heavy summer rains, canal overflow, and inadequate drainage around slab-on-grade homes cause regular flooding events throughout Southwest Florida. Royal Water Damage responds quickly because floodwater in Fort Myers carries a unique risk profile: warm temperatures accelerate mold onset, the water often carries storm drain contamination, and concrete slab systems trap moisture that must be actively extracted. Our crews use desiccant dehumidifiers and specialized floor drying systems designed for Florida's slab construction.",
    features: [
      "High-volume truck-mounted water extraction",
      "Specialized slab and concrete drying systems for Florida construction",
      "Thermal imaging to detect moisture under tiles and in block walls",
      "Contamination testing for stormwater and canal-sourced flooding",
      "Content removal, cleaning, and storage coordination",
      "FEMA and NFIP flood claim documentation support",
    ],
    process: [
      {
        step: 1,
        title: "Safety Check & Water Extraction",
        description:
          "We confirm electrical safety before entry, then deploy truck-mounted extractors to remove standing water as rapidly as possible. Speed matters — every hour of contact time increases the contamination load and moisture absorbed by structural materials.",
      },
      {
        step: 2,
        title: "Contamination Assessment",
        description:
          "Floodwater in Fort Myers often carries lawn chemicals, fertilizers, animal waste, and storm drain contamination. We test the water category and treat accordingly — Category 2 and 3 losses require enhanced disinfection protocols.",
      },
      {
        step: 3,
        title: "Structural Drying",
        description:
          "Industrial air movers, dehumidifiers, and where needed, floor mat drying systems are deployed to pull moisture from concrete slabs, block walls, and framing. We take daily moisture readings to track drying progress against IICRC targets.",
      },
      {
        step: 4,
        title: "Restoration & Documentation",
        description:
          "Damaged materials are replaced and the space is restored. We compile a complete moisture log, photo documentation, and scope of loss report — essential for FEMA assistance applications and NFIP flood insurance claims.",
      },
    ],
    faqs: [
      {
        question: "Does Fort Myers flood often?",
        answer:
          "Yes — Fort Myers and Lee County rank among Florida's highest-risk flood zones. The city sits near the mouth of the Caloosahatchee River, and many neighborhoods are in FEMA-designated AE or VE flood zones. Even areas outside mapped flood zones flooded during Hurricane Ian in 2022. Summer thunderstorms routinely cause localized street and yard flooding that can enter homes through doors, vents, and slab cracks.",
      },
      {
        question: "Do I need flood insurance if I already have homeowner's insurance in Florida?",
        answer:
          "Yes. Standard homeowner's insurance does not cover flooding from external water sources — rain, storm surge, river overflow, or street flooding. You need a separate flood insurance policy through the NFIP or a private carrier. If your home is in a FEMA Special Flood Hazard Area and you have a federally backed mortgage, flood insurance is legally required.",
      },
      {
        question: "How long does it take to dry out a flooded home in Florida?",
        answer:
          "In Fort Myers' hot, humid climate, professional structural drying typically takes 3 to 7 days for standard residential losses. Slab-on-grade construction is particularly challenging because concrete absorbs and releases moisture slowly. Properties with significant flooding may require longer drying times, and daily monitoring ensures the drying equipment is calibrated correctly for actual conditions.",
      },
      {
        question: "Can I use fans and open windows to dry my house after flooding?",
        answer:
          "In Fort Myers, opening windows during and after a flooding event is often counterproductive. Outdoor relative humidity regularly exceeds 80%, meaning outdoor air is too moist to assist drying and may actually slow the process or introduce additional moisture. Professional dehumidifiers remove 20–50 gallons of water from the air per day — household fans simply move moist air around without removing it.",
      },
      {
        question: "What should I throw away after a flood?",
        answer:
          "Any porous material that absorbed Category 2 or 3 floodwater and cannot be fully dried and disinfected should be discarded. This typically includes carpet and pad, drywall that was submerged, insulation, particle board furniture, and mattresses. Hard-surface items like solid wood furniture, tile, and metal fixtures can often be cleaned and saved. We help you distinguish what's salvageable versus what needs to go.",
      },
    ],
    metaTitle: "Flood Cleanup Fort Myers FL | Fast Water Removal",
    metaDescription:
      "Emergency flood cleanup in Fort Myers, FL. Rapid water extraction, slab drying systems, and FEMA documentation. Royal Water Damage — (864) 734-5702.",
    keywords: [
      "flood cleanup Fort Myers",
      "basement flood cleanup Fort Myers FL",
      "flood water removal Fort Myers",
      "hurricane flooding cleanup Fort Myers",
      "storm flooding Lee County",
      "flood damage restoration Fort Myers",
    ],
  },
  {
    slug: "storm-damage-restoration",
    title: "Storm & Hurricane Damage Restoration",
    headline: "Storm & Hurricane Damage Restoration in Fort Myers, FL",
    tagline: "Lee County's trusted storm restoration team — ready before, during, and after hurricane season.",
    icon: "CloudLightning",
    heroDescription:
      "Storm and hurricane damage restoration encompasses the full range of emergency and long-term recovery services needed after a severe weather event — from emergency board-up and tarping to water extraction, structural drying, mold prevention, and complete rebuilding. In Southwest Florida, the threat is most severe from June through November, when tropical storms and hurricanes can bring storm surge, 100+ mph winds, and torrential rainfall that overwhelm even well-maintained homes. Rapid professional response after a storm prevents secondary damage that compounds the loss and complicates insurance claims.",
    description:
      "Hurricane Ian made landfall near Fort Myers Beach on September 28, 2022 as a Category 4 storm, causing historic storm surge damage across Lee County that reshaped entire neighborhoods. For the Fort Myers area, that event was a defining moment — and a reminder that storm damage doesn't always look the way homeowners expect. Wind-driven rain infiltrating a compromised roof can soak insulation and framing days before the leak becomes visible inside. Royal Water Damage maintains a readiness posture throughout hurricane season, pre-stocking materials and coordinating crew schedules around storm tracks so we can respond the moment conditions allow safe access. Our goal is simple: get your property secured, dried, and on the path to restoration before the next storm system arrives.",
    features: [
      "Emergency roof tarping and window/door board-up services",
      "Wind-driven rain and storm surge water extraction",
      "Mold prevention treatment applied during the drying phase",
      "Storm documentation and Xactimate scope for insurance claims",
      "Debris removal from the interior and exterior",
      "Full reconstruction from roof to flooring",
    ],
    process: [
      {
        step: 1,
        title: "Emergency Securing",
        description:
          "As soon as access is safe, we tarp damaged roofing and board compromised openings to prevent continued water intrusion. This step is critical in Fort Myers where additional rain events can follow within days of a hurricane.",
      },
      {
        step: 2,
        title: "Damage Documentation",
        description:
          "We photograph and document every damaged element — interior and exterior — before any work begins. This creates a defensible claim file for your insurance adjuster and prevents disputes about what damage occurred versus pre-existing conditions.",
      },
      {
        step: 3,
        title: "Water Removal & Structural Drying",
        description:
          "Water is extracted and the structure is dried using the full complement of commercial equipment. Mold-prevention antimicrobials are applied to framing and sheathing as drying progresses to guard against the rapid mold growth Fort Myers' climate makes possible.",
      },
      {
        step: 4,
        title: "Reconstruction & Final Inspection",
        description:
          "We rebuild the damaged areas — from roof decking and shingles to interior walls, flooring, and finishes — and conduct a final quality inspection. We coordinate with your insurance company throughout to keep the project on schedule.",
      },
    ],
    faqs: [
      {
        question: "What should I do after a hurricane damages my Fort Myers home?",
        answer:
          "Once the storm passes and authorities confirm it's safe to return, document everything with photos and video before touching anything. Call your insurance company to file a claim, then contact a restoration company for emergency securing and assessment. Do not let a contractor pressure you into signing a contract before your adjuster has assessed the damage — but do have the property secured quickly to prevent further losses.",
      },
      {
        question: "Will insurance cover storm damage to my roof in Florida?",
        answer:
          "Florida homeowner's policies generally cover sudden storm damage to roofs, including wind damage, impact from fallen trees, and resulting water intrusion. However, Florida has seen significant changes in property insurance in recent years, and policy language regarding roof claims varies. We provide thorough documentation to maximize your claim and can refer you to a public adjuster if your claim is being underpaid.",
      },
      {
        question: "How soon after a hurricane can restoration work begin?",
        answer:
          "Emergency securing — tarping and board-up — can often begin within hours once a storm has passed and access is safe. Full interior restoration typically begins within 24 to 72 hours. We prioritize rapid response because every day of delay increases the likelihood of mold growth in Fort Myers' climate and increases the extent of secondary damage.",
      },
      {
        question: "Can storm damage cause mold to grow quickly in Fort Myers?",
        answer:
          "Yes — this is one of the most critical factors in post-hurricane recovery in Southwest Florida. With ambient temperatures above 80°F and high humidity, mold can begin growing on wet building materials within 24 to 48 hours. After Hurricane Ian, many Lee County homes that weren't immediately dried developed significant mold problems within a week. Speed of drying is the single most effective mold prevention measure.",
      },
      {
        question: "Do I need to use my insurance company's preferred contractor for storm repairs?",
        answer:
          "No. Florida law gives policyholders the right to choose their own licensed contractor for storm repairs. Insurance companies may recommend preferred vendors, but you are not obligated to use them. You have the right to get independent estimates and choose the contractor you trust. We work with all carriers and are experienced in Florida storm claim procedures.",
      },
    ],
    metaTitle: "Storm & Hurricane Damage Restoration Fort Myers FL",
    metaDescription:
      "Storm and hurricane damage restoration in Fort Myers, FL. Emergency tarping, water extraction, mold prevention, full rebuild. Royal Water Damage — (864) 734-5702.",
    keywords: [
      "storm damage restoration Fort Myers",
      "hurricane damage repair Fort Myers FL",
      "hurricane restoration Lee County",
      "storm damage cleanup Fort Myers",
      "hurricane Ian damage repair Fort Myers",
      "wind damage restoration Fort Myers",
    ],
  },
  {
    slug: "emergency-water-extraction",
    title: "Emergency Water Extraction",
    headline: "Emergency Water Extraction in Fort Myers, FL",
    tagline: "Standing water removed fast — 24/7 emergency dispatch across Southwest Florida.",
    icon: "Zap",
    heroDescription:
      "Emergency water extraction is the immediate removal of standing water from a home or business using commercial-grade extraction equipment — typically truck-mounted or portable units capable of removing hundreds of gallons per hour. It is the critical first step in any water damage response, stopping active damage to flooring, walls, and building materials before the drying process begins. The faster water is extracted, the less moisture is absorbed by the structure and the lower the ultimate cost of restoration.",
    description:
      "When you have water standing in your Fort Myers home, every minute counts. Water absorbed by hardwood floors can cause them to cup and buckle within hours. Drywall begins to lose structural integrity rapidly, and in Southwest Florida's heat, mold spores — always present in the air — can begin colonizing wet surfaces before the end of the day. Royal Water Damage keeps fully equipped emergency extraction crews on call 24 hours a day because we understand that a fast response is the single most important factor in minimizing damage and cost. Our truck-mounted extractors can remove thousands of gallons of water in a fraction of the time a wet-vac or portable unit could manage — and we follow every extraction with a detailed moisture assessment to confirm the full scope of affected areas.",
    features: [
      "24/7 emergency dispatch — live answer, no voicemail",
      "Truck-mounted extractors capable of 25+ gallons per minute",
      "Portable extraction units for confined spaces and upper floors",
      "Moisture mapping with thermal imaging after extraction",
      "Immediate deployment of drying equipment following extraction",
      "Documentation of pre-drying conditions for insurance",
    ],
    process: [
      {
        step: 1,
        title: "Immediate Dispatch",
        description:
          "Call us and reach a live person — any hour, any day. We collect key information about your situation while the nearest available crew loads up and begins driving to your Fort Myers property.",
      },
      {
        step: 2,
        title: "Rapid Extraction",
        description:
          "Our crew arrives and immediately deploys extraction equipment. Truck-mounted units are used for large volumes; portable units reach tight spaces like closets, bathrooms, and crawl areas. We extract until no more free-standing water remains.",
      },
      {
        step: 3,
        title: "Moisture Assessment",
        description:
          "After extraction, we use thermal cameras and calibrated moisture meters to map every area of hidden moisture — under tiles, inside walls, beneath cabinets. This step ensures nothing is missed before drying equipment is set.",
      },
      {
        step: 4,
        title: "Drying Equipment Deployment",
        description:
          "Air movers and dehumidifiers are placed in a scientifically calculated configuration based on the moisture map. We document the setup and schedule return visits to monitor progress until drying is complete.",
      },
    ],
    faqs: [
      {
        question: "How fast can you get to my home for emergency water extraction in Fort Myers?",
        answer:
          "Our target response time for Fort Myers and the immediately surrounding area is 60 minutes or less from the time of your call. For locations in Lee County like Cape Coral, Estero, Bonita Springs, and Lehigh Acres, arrival typically occurs within 45 to 90 minutes. We'll give you an honest estimate when you call.",
      },
      {
        question: "Can I use a shop vac or wet-dry vacuum to remove water from my floor?",
        answer:
          "A shop vac can remove a small amount of surface water and is fine for very minor spills, but it is not adequate for any meaningful flooding event. Professional extraction equipment removes water 10 to 20 times faster, and more importantly, it pulls moisture from the porous layers of flooring and subfloor that a shop vac simply can't reach. Using only a shop vac and fans gives mold a head start in Fort Myers' climate.",
      },
      {
        question: "Do I have to wait for my insurance company to approve before extraction starts?",
        answer:
          "No — and you shouldn't. Florida law and your policy's mitigation clause require you to take reasonable steps to prevent further damage as soon as possible. Waiting for adjuster approval before stopping active water damage could result in your insurer reducing your claim for 'failure to mitigate.' We begin work immediately and handle all the insurance documentation in parallel.",
      },
      {
        question: "How do I know if all the water has been removed from my home?",
        answer:
          "You can't know with certainty using visual inspection alone. Water migrates into wall cavities, beneath tile, and under hardwood floors where it's invisible to the eye but measurable with professional moisture meters and thermal cameras. Our post-extraction moisture mapping ensures every hidden wet area is identified and treated — this is how we prevent mold problems weeks after an apparent cleanup.",
      },
      {
        question: "What's the difference between water extraction and water damage restoration?",
        answer:
          "Water extraction is specifically the removal of free-standing liquid water — it's the emergency first step. Water damage restoration is the complete process: extraction, structural drying (removing absorbed moisture from materials), cleaning, antimicrobial treatment, and rebuilding damaged elements. Extraction is the foundation, but restoration brings your home all the way back to pre-loss condition.",
      },
    ],
    metaTitle: "Emergency Water Extraction Fort Myers FL | 24/7",
    metaDescription:
      "24/7 emergency water extraction in Fort Myers, FL. Truck-mounted units, 60-min response, moisture mapping. Royal Water Damage — call (864) 734-5702 now.",
    keywords: [
      "emergency water extraction Fort Myers",
      "water extraction Fort Myers FL",
      "24/7 water removal Fort Myers",
      "standing water removal Fort Myers",
      "water extraction Lee County",
      "flood water extraction Fort Myers",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
