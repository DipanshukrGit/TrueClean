// export const servicesData = {
//   "recurring": {
//     id: "recurring",
//     title: "Recurring Services",
//     subtitle: "Regular maintenance for a consistently clean home",
//     description: "These services are for regular maintenance of a home and are often scheduled on a weekly, bi-weekly, or monthly basis.",
//     services: [
//       {
//         title: "Standard or Regular Cleaning",
//         description: "This is the most common type of service. It covers general upkeep and light cleaning tasks in common areas like living rooms, bedrooms, and bathrooms. Tasks typically include dusting, vacuuming, mopping, tidying up, and wiping down surfaces."
//       },
//       {
//         title: "Maid Service",
//         description: "Similar to standard cleaning, a maid service often includes additional household chores like laundry, ironing, and changing bed linens. The service is usually provided by the same person or team to maintain a consistent routine."
//       }
//     ]
//   },
//   "specialty": {
//     id: "specialty",
//     title: "Specialty Services",
//     subtitle: "In-depth services beyond standard cleaning",
//     description: "These are typically one-time, in-depth services that go beyond the scope of a standard clean.",
//     services: [
//       {
//         title: "Deep Cleaning",
//         description: "This is a comprehensive, top-to-bottom clean of the entire home. It includes tasks that are not part of a regular service, such as cleaning inside the oven and refrigerator, wiping down baseboards and light fixtures, scrubbing grout, and cleaning behind and under furniture."
//       },
//       {
//         title: "Move-In/Move-Out Cleaning",
//         description: "This service is similar to a deep clean but is specifically for an empty home before a new resident moves in or after a previous one has left. It focuses on ensuring every surface is sanitized and spotless for a new occupant, including cleaning inside all cabinets, drawers, and closets."
//       },
//       {
//         title: "Post-Construction Cleaning",
//         description: "This is a specialized service designed to remove the fine dust, debris, and residue left after a renovation or construction project. It requires specific tools and techniques to thoroughly clean all surfaces, including floors, vents, and walls, to make the home livable and safe."
//       },
//       {
//         title: "Spring Cleaning",
//         description: "A type of deep clean often performed annually to refresh the home after a long season. It often involves decluttering, organizing, and tackling areas that have been neglected."
//       }
//     ]
//   },
//   "task-based": {
//     id: "task-based",
//     title: "Task-Based Services",
//     subtitle: "Specialized services for specific areas",
//     description: "Some companies offer services focused on a single task or area of the home. These are often add-ons or separate bookings.",
//     services: [
//       {
//         title: "Carpet and Upholstery Cleaning",
//         description: "This uses specialized equipment like steam cleaners and specific cleaning solutions to remove deep-seated dirt, stains, and allergens from carpets, rugs, and furniture."
//       },
//       {
//         title: "Window Cleaning",
//         description: "This service focuses specifically on cleaning windows, including the interior, exterior, screens, and tracks."
//       },
//       {
//         title: "Ceiling Fans Cleaning",
//         description: "Specialized cleaning of ceiling fans including blades, motor housing, and light fixtures to remove dust and debris that accumulates over time."
//       },
//       {
//         title: "Oven Cleaning",
//         description: "Deep cleaning of oven interiors, racks, and surfaces using specialized cleaning products to remove baked-on grease and food residue."
//       },
//       {
//         title: "Pressure Washing",
//         description: "Primarily for exterior surfaces, this service uses high-pressure water to clean driveways, patios, siding, and decks, removing dirt, mold, and grime."
//       },
//       {
//         title: "Disinfection and Sanitization",
//         description: "A service that focuses on killing germs and bacteria using hospital-grade disinfectants, often in response to an illness or to create a healthier environment."
//       },
//       {
//         title: "Green Cleaning",
//         description: "This is not a task itself but a methodology that can apply to any of the above services. It involves using environmentally friendly, non-toxic, and biodegradable products to protect the health of occupants and the environment."
//       }
//     ]
//   }
// };


export const servicesData = {
  "recurring": {
    id: "recurring",
    title: "Recurring Services",
    subtitle: "A clean you can count on, week after week.",
    description: "Our recurring plans keep every room guest-ready with eco-safe products, a standardized checklist, and the same trusted team.",
    services: [
      {
        title: "Standard / Regular Cleaning",
        description: "Regular, health-first maintenance of all of your living spaces, great for weekly, bi-weekly, or monthly so that bedrooms, bathrooms and common areas are consistently kept clean and comfortable!",
        includes: "Dusting, vacuuming, mopping, cleaning, and wipe downs of frequently used rooms for a fresh, ready to live in feel.",
        image: "/Images/services/Standard_or_Regular_Cleaning.webp"
      },
      {
        title: "Maid Service",
        description: "Everything from Standard Cleaning, plus some light housekeeping chores – by the same trusted individual or team for rhythm and continuity.",
        includes: "Money-saving useful options for things like laundry, ironing, bed-linen change as part of the regular maintenance, available weekly, bi-weekly, or monthly as you choose.",
        image: "/Images/services/Maid_Service.webp"
      }
    ]
  },
  "specialty": {
    id: "specialty",
    title: "Speciality Services",
    subtitle: "When your home requires more than a routine refresh.",
    description: "Specialty Services provide a total reset. From deep cleans to move-in makeovers, we tackle every corner with precision and care.",
    services: [
      {
        title: "Deep Cleaning",
        description: "Total, top-to-bottom detailing of your home - great for a total reset that goes beyond normal cleaning. We focus on neglected, hard to reach, or underappreciated areas of your home for a noticeably cleaner and healthier living space.",
        includes: "Inside oven & refrigerator, scrubbing of tile grout, baseboards & light fixtures, behind/underneath furniture, high-touch surfaces, edges & corners, final polished pass.",
        image: "/Images/services/Deep_Cleaning.webp"
      },
      {
        title: "Move-In / Move-Out Cleaning",
        description: "Deep clean an empty home so you can hand over or move into an entirely new feeling home - sanitized, cleaned, and ready to live in.",
        includes: "Inside cabinets, drawers & closets, surface sanitization, outside of appliances, fixtures & fittings detailing, floors vacuumed & mopped, entryways and switch plates freshened.",
        image: "/Images/services/Move-Out_Cleaning.webp"
      },
      {
        title: "Post-Construction Cleaning",
        description: "A specialized service for the removal of fine dust, debris, and residue left over after renovation or building work—and using the proper tooling and technique to make the home truly livable once more, not just 'finished'.",
        includes: "Dust removal from floors, off vents & walls, wipe down ledges & trim, detailing of fixtures/panels, clean tracks & grooves, multiple pass dust extraction for settling dust, and check for hard surfaces for any residue.",
        image: "/Images/services/Post-Construction_Cleaning.webp"
      },
      {
        title: "Spring Cleaning",
        description: "A seasonal deep refresh that resets neglected areas, combines some light organizing with a detailed clean, and gives your home a brighter start to the year!",
        includes: "Decluttering support, organized surfaces, attention to late-touch areas (tops of cupboards, underneath sofas), window sills & tracks, wardrobe refresh, balustrades & skirting cleared, and final air out while finishing fragrance free.",
        image: "/Images/services/Spring_Cleaning.webp"
      }
    ]
  },
  "task-based": {
    id: "task-based",
    title: "Task-Based Services",
    subtitle: "Add the perfect finishing touch to your clean.",
    description: "Whether it's sanitizing high-touch zones or bringing back the sparkle to your oven, our Task-Based Services give every corner its moment.",
    services: [
      {
        title: "Carpet & Upholstery Cleaning",
        description: "Remove embedded dust, stains, and allergens from carpets, rugs, sofas, and chairs with fabric-appropriate techniques and professional equipment—no harsh residues left behind.",
        includes: "Vacuum + pre-treat, targeted stain work, fabric-safe rinse/extract, fibre grooming, quick dry guidance.",
        image: "/Images/services/Carpet_and_Upholstery_Cleaning.webp"
      },
      {
        title: "Window Cleaning",
        description: "Restore bright, streak-free views. We clean interior/exterior panes (where accessible), plus screens and tracks for a complete finish.",
        includes: "Dust & vacuum tracks, wash panes, wipe frames & sills, final polish.",
        image: "/Images/services/Window_Cleaning.webp"
      },
      {
        title: "Ceiling Fans Cleaning",
        description: "Detailed cleaning of blades, motor housings, and attached fixtures to eliminate dust build-up that circulates through the room.",
        includes: "Dry dust + degrease (if required), wipe, polish, and balance check (visual).",
        image: "/Images/services/Ceiling_Fan_Cleaning.webp"
      },
      {
        title: "Oven Cleaning",
        description: "Deep-clean the oven cavity, racks, and touch surfaces to remove baked-on grease and lingering odors—so your kitchen smells fresh and cooks cleaner.",
        includes: "Soak & degrease racks, non-caustic interior clean, door glass detail, gasket wipe.",
        image: "/Images/services/Deep_Cleaning.webp"
      },
      {
        title: "Pressure Washing",
        description: "Exterior refresh of driveways, patios, decks, pavers, and select facades. High-pressure cleaning lifts grime, mold, and weather stains for a like-new look.",
        includes: "Pre-rinse, pressure wash, targeted stain passes, final rinse.",
        image: "/Images/services/Pressure_Washing.webp"
      },
      {
        title: "Disinfection & Sanitization",
        description: "Target high-touch zones with industry-grade disinfectants for an extra layer of protection—especially post-illness or during high-traffic events.",
        includes: "Door handles, switches, railings, appliance touchpoints, bathroom fixtures; follows contact time and dwell-time best practices.",
        image: "/Images/services/Disinfection__Sanitization.webp"
      },
      {
        title: "Green Cleaning",
        description: "Use only eco-friendly, non-toxic, and biodegradable products as part of every clean. Our approach ensures a spotless home that's safe for children, pets, and allergy-sensitive families—without harsh chemical smells or residues.",
        includes: "Plant-based cleaners, hypoallergenic formulas, microfiber tools, HEPA vacuuming for dust and allergens, and safe practices across kitchens, baby rooms, and pet areas.",
        image: "/Images/services/Green_Cleaning.webp"
      }
    ]
  }
};