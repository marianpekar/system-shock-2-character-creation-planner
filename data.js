const STAT_DEFS = [
  { key: 'Strength',           label: 'Strength',    group: 'Physical'  },
  { key: 'Endurance',          label: 'Endurance',   group: 'Physical'  },
  { key: 'Agility',            label: 'Agility',     group: 'Physical'  },
  { key: 'Standard Weapons',   label: 'Std Weapons', group: 'Combat'    },
  { key: 'Energy Weapons',     label: 'Energy Wpn',  group: 'Combat'    },
  { key: 'Heavy Weapons',      label: 'Heavy Wpn',   group: 'Combat'    },
  { key: 'Hack',               label: 'Hack',        group: 'Technical' },
  { key: 'Repair',             label: 'Repair',      group: 'Technical' },
  { key: 'Modify',             label: 'Modify',      group: 'Technical' },
  { key: 'Maintenance',        label: 'Maintenance', group: 'Technical' },
  { key: 'Research',           label: 'Research',    group: 'Technical' },
  { key: 'Cybernetic Affinity',label: 'Cyber Aff',   group: 'Augmented' },
  { key: 'Psionic Ability',    label: 'Psi Ability', group: 'Augmented' },
];

const BRANCH_RESULT = 'Select a year assignment to see posting details.'

const BRANCHES = {
  marines: {
    name: 'Marines', css: 'marines',
    baseStats: { 'Standard Weapons': 1 },
    basePsi: [],
    description: 'The first and most basic choice. Marines are front-line combatants — aggressive, well-armed, and trained for direct engagement. Your standard weapons training begins immediately upon enlistment.',
    result: BRANCH_RESULT,
    years: [
      [
        {
          id: 'm1a', name: 'Supply Ship Gallo',
          stats: { Strength: 2 }, psi: [], equipment: [],
          description: "If you're partial to spending time with a lot of high explosives, this posting is for you. There's a lot of heavy lifting, but Ordinance also gets the first pick of the booze and other goodies coming aboard the supply ship Gallo. Lock and load!",
          result: "Your stint aboard the UNN Gallo is finished. Well, you've spent more exciting years, haven't you, marine? If you ever look at another UNN packing crate, you'll put a bullet in your head. But you used the time well and bulked up considerably."
        },
        {
          id: 'm1b', name: 'Io Survival School',
          stats: { Endurance: 2 }, psi: [], equipment: [],
          description: "The Navy maintains a survival training school on the surface of Io, the third moon of Jupiter. Pros: No better way to improve stamina and survival skills. Cons: The 21.2% mortality rate. Plus you've got to spend the year with a bunch of Navy skanks.",
          result: "Your stint at the Io Survival School is finished. You managed to survive your year there ... barely. The encounter with a descendant of a Citadel Station tiger mutant put you in the sickbay for a month. But now you're one tough marine."
        },
        {
          id: 'm1c', name: 'Guadalcanal Training Station',
          stats: { Agility: 2 }, psi: [], equipment: [],
          description: "Not every boarding party has the luxury of gravity. So the Corps strongly recommends every one of its brethren gets in some zero-g training. A year aboard the training station Guadalcanal should suffice.",
          result: "Your year on Guadalcanal Station is finished. The place served you well, leatherneck, and you're sleeker than ever. Maybe if you spent less time drinking the lighter fluid they serve in the commissary, you might have done even better."
        }
      ],
      [
        {
          id: 'm2a', name: 'UNN Antigua',
          stats: { 'Energy Weapons': 1, 'Cybernetic Affinity': 1 }, psi: [],
          equipment: ['Poor-condition laser pistol'],
          description: "A tour of duty aboard the Antigua should let you pick up some one-on-one beam weapon training from Gunnery Sergeant Malloy. But heads up, she's a world-class SOB.",
          result: "Time to get off the UNN Antigua and back to Wake Island Station, and not a month too soon. Five months into your posting, the Gunnery Sergeant snapped during a training exercise and killed half a troop with live plasma fire before you tackled her. After that, you were in charge of the exercises."
        },
        {
          id: 'm2b', name: 'Asteroid Belt Ore Facility',
          stats: { 'Heavy Weapons': 1, 'Cybernetic Affinity': 1 }, psi: [],
          equipment: ['Poor-condition grenade launcher', 'Fragmentation grenades (1 clip)'],
          description: "The automated asteroid ore facility in JM-432 supplies the UNN shipyards — crucial to defense. However, they're also prime candidates for hackers. A team is needed to head in there and blast past the automated defense systems.",
          result: "Time to get out of the Asteroid Belt and back to Wake Island Station. You'll probably have nightmares about cramped little tunnels for years, but you and the team got the job done. A combination of EMP grenades and high explosives stops most hostile machinery."
        },
        {
          id: 'm2c', name: 'Port MacArthur Training Facility',
          stats: { 'Standard Weapons': 2 }, psi: [], equipment: [],
          description: "Dummy ammunition, live ammunition, moving targets, stationary targets, live targets. The Port MacArthur training facility has enough hardware to warm the heart of any leatherneck.",
          result: "Time to get out of Port MacArthur and back to Wake Island Station. You got to pick up and refill more ammo casings than you can count. You even got to occasionally play the live target in an expert exercise. Still, you can't spend a year at the Mac without learning something."
        }
      ],
      [
        {
          id: 'm3a', name: 'UNN Home Office',
          stats: { Maintenance: 1 }, psi: [],
          equipment: ['Maintenance tool'],
          description: "The UNN secretary general's office needs a full staff of armed guards. When things are dull it requires a lot of standing around looking good in a uniform — when things are bad, it can require fending off a psi-terrorist assault.",
          result: "Get back to Wake Island Station pronto — your tour of duty at the UNN Home Office is finished. After a year of practice in the honor guard, you look sharp in a uniform and are a lot better at keeping your rifle in tip-top-shiny condition."
        },
        {
          id: 'm3b', name: 'Polidies Trading Station',
          stats: { Modify: 1 }, psi: [], equipment: [],
          description: "The Polidies trading station has long been a haven for the black market. Recent reports indicate the command staff has been overthrown and the station is under the control of a self-appointed Magnate. This must be rectified.",
          result: "Get back to Wake Island Station pronto — your year on Polidies Station is finished. Taking on the Magnate's forces was a cakewalk. The only thing you thought was even mildly interesting was taking apart the black market weapons afterwards to see what sort of fancy mods they'd made."
        },
        {
          id: 'm3c', name: 'UNN Antigua (Colony Air Service)',
          stats: { Repair: 1 }, psi: [], equipment: [],
          description: "The Colony Air Service gets the dregs of the fleet, and the Antigua is the dregs of the dregs. You'll learn a lot about recalcitrant machinery on a tour of duty aboard the Antigua, if it doesn't blow you to hell and back first.",
          result: "Get back to Wake Island Station pronto — your tour of duty on the UNN Antigua is finished. You kept the Antigua running for six months when every system in the book crashed daily. But your real problems came when the convicts the Air Service was shipping decided to try a revolt."
        }
      ]
    ]
  },

  navy: {
    name: 'Navy', css: 'navy',
    baseStats: { 'Standard Weapons': 1 },
    basePsi: [],
    description: 'Naval service emphasizes high-tech aptitude and systems knowledge. Navy recruits are versatile — comfortable with weapons but equally at home interfacing with complex shipboard machinery and data systems.',
    result: BRANCH_RESULT,
    years: [
      [
        {
          id: 'n1a', name: 'UNN Lucille (Ops Training)',
          stats: { Hack: 1, Strength: 1 }, psi: [], equipment: [],
          description: "The UNN Lucille is looking for an Ops training officer to learn the ship's navigation and data control systems. You'll get your feet wet with the high-tech systems, but also expect some heavy lifting.",
          result: "Your tour of duty aboard the UNN Lucille has concluded. Captain Mayer was pleased with your work, especially the initiative you showed in physical training. A friendly ensign showed you some backdoors into the ship's primary data loop and you spent your time off pumping iron."
        },
        {
          id: 'n1b', name: 'UNN Lucille (Engineering)',
          stats: { Repair: 1, Strength: 1 }, psi: [], equipment: [],
          description: "The UNN Lucille is looking for an engineer's mate to help maintain the ship's core energy systems. There's some heavy lifting involved, sailor, but you'll learn your way around high-tech equipment.",
          result: "Your tour of duty aboard the UNN Lucille has concluded. Captain Mayer was pleased with your work, especially your willingness to get your hands dirty. You showed a special aptitude for fixing what got broken and lugging out what couldn't be fixed."
        },
        {
          id: 'n1c', name: 'UNN Lucille (Military Police)',
          stats: { Modify: 1, Strength: 1 }, psi: [], equipment: [],
          description: "The UNN Lucille is looking for volunteers for their military police detachment. Those sailors can get pretty rowdy on these year-long cruises, so you better not be afraid of a tussle.",
          result: "Your tour of duty aboard the UNN Lucille has concluded. A productive year, though you didn't make a lot of friends. Between toughening up by putting drunken middies in the sickbay, you had plenty of down time in the armory to play with the pretty toys."
        }
      ],
      [
        {
          id: 'n2a', name: 'UNN Carfax (Nav Officer)',
          stats: { 'Cybernetic Affinity': 2 }, psi: [], equipment: [],
          description: "The UNN Carfax is undertaking a mission to examine a newly discovered class B comet approaching the outer solar system. You'll likely pick up useful skills working with the high-tech navigation systems aboard this newly commissioned heavy cruiser.",
          result: "Your tour of duty aboard the UNN Carfax has concluded. It was a good year for you, but not a great one for the Carfax. After taking a surprise hit from a small meteorite with 123 casualties including the chief navigation officer, you stepped in and filled his shoes."
        },
        {
          id: 'n2b', name: 'UNN Pierce (Maintenance)',
          stats: { Maintenance: 1 }, psi: [],
          equipment: ['Maintenance tool'],
          description: "The UNN Pierce is ferrying liberated political prisoners back from their detention near Saturn. The Pierce has been assigned a detachment of marines and needs sailors to load, administer, and maintain the arms on board.",
          result: "Your tour of duty aboard the UNN Pierce has concluded. Your year's tour was carried out without a hitch, except that one of the prisoners turned out to be a dissident spy. Before and after the excitement of his summary execution, you learned a fair bit about weapons maintenance from one of the lifers onboard."
        },
        {
          id: 'n2c', name: 'LaVerne Tactical Training School',
          stats: { 'Standard Weapons': 2 }, psi: [], equipment: [],
          description: "LaVerne, Florida, hosts the Navy's premier tactical training school. While maybe not as respected as the Marines' facility at Fort Bush, there's a lot to be learned here.",
          result: "Your tour of duty at the LaVerne Tactical Training School has concluded. A year of firing ranges, mock boarding parties, and war games has done you good. You spent plenty of time with military grade pistols, assault rifles, and even auto-shotguns."
        }
      ],
      [
        {
          id: 'n3a', name: 'Marie Curie Research Facility',
          stats: { Research: 1 }, psi: [], equipment: [],
          description: "The Navy's Marie Curie research facility on Aquinas 4 is conducting research on a new strain of spaceborne virus that killed 220,000 citizens of New Atlanta. To lift the quarantine, we must determine how the virus pierced the city's micro-nanite shielding.",
          result: "Your tour of duty at the Marie Curie Research Facility has concluded. Congratulations on surviving the disaster, sailor. When saboteurs removed the safety seals and released the virus into the atmospheric control regulators, you were one of the few to reach safety in time."
        },
        {
          id: 'n3b', name: 'Io Survival Training Facility',
          stats: { Endurance: 2 }, psi: [], equipment: [],
          description: "The Navy maintains a survival training school on the surface of Io, the third moon of Jupiter. Pros: No better way to improve stamina and survival skills. Cons: The 21.2% mortality rate.",
          result: "Your tour of duty at the Io Survival Training Facility has concluded. You managed to survive your year there ... barely. The encounter with a descendant of a Citadel Station tiger mutant put you in the sickbay for a month. You've learned to respect the wonders of biogenetics."
        },
        {
          id: 'n3c', name: 'Yamamoto Space Station',
          stats: { Agility: 2 }, psi: [], equipment: [],
          description: "The Navy strongly encourages every sailor to undertake some amount of zero-G training. A year at the Yamamoto Space Station in Earth's orbit will more than suffice.",
          result: "Your tour of duty at Yamamoto Station has concluded. You certainly weren't prepared for the events of this year. Captain Willits was never popular with his men, but you never expected half the crew to mutiny. The taut days spent regaining control of the ship lent you a grace and agility you never knew you were capable of."
        }
      ]
    ]
  },

  osa: {
    name: 'OSA', css: 'osa',
    baseStats: {},
    basePsi: ['Tier 1 Psi Disciplines', 'Psi Amp'],
    description: 'The OSA trains soldiers of the mind. Rather than raw combat stats, OSA recruits develop powerful psionic abilities. All OSA agents begin play with a Psi Amp and access to Tier 1 disciplines.',
    result: BRANCH_RESULT,
    years: [
      [
        {
          id: 'o1a', name: 'TOS Shao Ling',
          stats: {}, psi: ['Cryokinesis', 'Psychogenic Cyber Affinity', 'Tier Two Psi Access'],
          equipment: [],
          description: "The sensory deprivation tanks aboard the TOS Shao Ling await you. There you will spend a solitary year focused in meditation on electrons and circuitry, and how they may serve your will.",
          result: "Your year in the tanks of the Shao Ling is finished. Your will has grown. Your mind can freeze your foes in their tracks and you can attune your mind to the inner workings of machines. Second Tier disciplines are within your grasp."
        },
        {
          id: 'o1b', name: 'TOS Ru Nang',
          stats: {}, psi: ['Cryokinesis', 'Kinetic Redirection', 'Tier Two Psi Access'],
          equipment: [],
          description: "The sensory deprivation tanks aboard the TOS Ru Nang await you. A year in meditation on the nature of matter will grant you power over it.",
          result: "Your year in the tanks of the Ru Nang is finished. Your will has grown. Your mind can freeze your foes in their tracks and pull distant objects to you. These talents will serve you well. Second Tier disciplines are now within your grasp."
        },
        {
          id: 'o1c', name: 'TOS Chu Lun',
          stats: {}, psi: ['Cryokinesis', 'Psycho-Reflective Screen', 'Tier Two Psi Access'],
          equipment: [],
          description: "The sensory deprivation tanks aboard the TOS Chu Lun are modulated for your training. You shall spend a year in contemplation of mass — both yours and that of objects — until you can bend it to your intentions.",
          result: "Your year in the tanks of the Chu Lun is finished. Your will has grown. You have learned how to freeze your foes in their tracks and how to shield yourself from them as well. Second Tier disciplines are now within your grasp."
        }
      ],
      [
        {
          id: 'o2a', name: 'OSA Central Core',
          stats: { 'Psionic Ability': 2 }, psi: [], equipment: [],
          description: "Sifting the thoughts of treachery and disloyalty from the morass of emotion that fills most mundane minds can be disquieting. You shall spend a year building the general strength of your mind while learning how to probe the thoughts of the less capable without losing yourself.",
          result: "Your time of service at the OSA Central Core has reached its end. Your year was mostly peaceful, with one major exception. The hired assassin tried to disguise her intentions under a layer of quite explicit daydreams, but you were not deceived."
        },
        {
          id: 'o2b', name: 'OSS Ki Luan',
          stats: { Research: 1 }, psi: [], equipment: [],
          description: "Dr. Chandrisvilan's research labs have produced many of this decade's advances in psionic technique. You shall spend a year serving his genius, learning to understand his insights and whims.",
          result: "Your time of service on the Ki Luan has reached its end. Maintaining patience for a year under the emotional Dr. Chandrisvilan's patronage was difficult. However, careful observation of his technique — and a careful, if illicit, examination of his laboratory notebooks — has led you to a better understanding of the process of research."
        },
        {
          id: 'o2c', name: 'Io Survival Training Facility',
          stats: { Endurance: 2 }, psi: [], equipment: [],
          description: "Your body has been neglected in your training of your mind. On Io, you will find soldiers who wish to test their endurance. You will surpass their physical prowess without compromising your mental discipline.",
          result: "You are directed to return to Station 74/34A. Your year at the Io Facility has reached its conclusion. You know now that the only real opponent is one who is more cunning than you. You used the cadets around you as prey and learned from their failings."
        }
      ],
      [
        {
          id: 'o3a', name: 'OSA Central Core (Counter-Terror)',
          stats: { Strength: 1, Agility: 1, 'Cybernetic Affinity': 1 },
          psi: ['Psychogenic Agility'],
          equipment: [],
          description: "Acts of political terrorism and corporate coercion disturb stability. You shall spend a year battling these chaotic elements, both psionically and by physical force.",
          result: "You are directed to return to Station 74/34A. Your year with the OSA Central Core has reached its conclusion. You learned the ways of lifting secrets from the minds of enemies and disarming their devices. When it came time to act, speed — both natural and mentally enhanced — was critical."
        },
        {
          id: 'o3b', name: 'OSA Field Base (Elimination)',
          stats: { Strength: 1, Agility: 1, 'Cybernetic Affinity': 1 },
          psi: ['Neuro-Reflex Dampening'],
          equipment: [],
          description: "In the grand scheme, individuals are no more important than pieces on a game board. Occasionally, it becomes necessary to remove a piece, without disturbing the flow of the game. These removals will be done in silence, and with complete secrecy.",
          result: "You are directed to return to Station 74/34A. Your year with the OSA Field Base has reached its conclusion. You have enjoyed your power over life and death, and your careful moves served to prevent great chaos. You learned the art of deadly motion, and the art of complete stillness."
        },
        {
          id: 'o3c', name: 'OSA Field Base (Infiltration)',
          stats: { Strength: 1, Agility: 1, 'Cybernetic Affinity': 1 },
          psi: ['Remote Electron Tampering'],
          equipment: [],
          description: "Many threats to security can only be defeated from inside. Your mind shall be carefully blanked and conditioned with the nature and past of a criminal. Join with the criminal and rebellious, endure their squalor and chaos, and then, when it is time, liquidate them from within.",
          result: "Your time of service at the OSA Field Base has reached its end. Even now, your mind is somewhat clouded and you do not recall all the details. You played your part well for most of a year, and your enemies called you friend, until you fell upon them with all your talents."
        }
      ]
    ]
  }
};