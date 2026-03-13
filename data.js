// ═══════════════════════════════════════════════
//  STEELCRAFT WORKSHOP — DATA STORE
//  Edit via Admin Panel or directly here
// ═══════════════════════════════════════════════

const SITE_DATA = {
  machines: [
    {
      id: 1,
      name: "CNC Turning Center TC-500",
      category: "cnc",
      categoryLabel: "CNC Machine",
      price: "₹18,50,000",
      badge: "BESTSELLER",
      stock: "in",
      description: "High-precision 2-axis CNC turning center ideal for automotive parts, flanges, and shafts. Features Fanuc 0iT control system with sub-micron accuracy.",
      image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80",
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
        "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80"
      ],
      specs: {
        "Max Swing Diameter": "500 mm",
        "Max Turning Length": "1000 mm",
        "Spindle Speed": "3500 RPM",
        "Spindle Power": "22 kW",
        "Control System": "Fanuc 0iT",
        "Tool Stations": "12",
        "Rapid Traverse": "24 m/min",
        "Weight": "4200 kg"
      }
    },
    {
      id: 2,
      name: "Heavy Duty All-Geared Lathe L-400",
      category: "lathe",
      categoryLabel: "Lathe Machine",
      price: "₹4,20,000",
      badge: "HOT",
      stock: "in",
      description: "Robust all-geared lathe for heavy-duty operations. Perfect for repair workshops, training institutes, and production floors.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80"
      ],
      specs: {
        "Swing Over Bed": "400 mm",
        "Distance Between Centers": "1500 mm",
        "Spindle Bore": "52 mm",
        "Spindle Speeds": "12 steps (40-1600 RPM)",
        "Motor Power": "5.5 kW",
        "Cross Slide Travel": "250 mm",
        "Weight": "1850 kg"
      }
    },
    {
      id: 3,
      name: "MIG/MAG Welding Machine WM-350",
      category: "welding",
      categoryLabel: "Welding",
      price: "₹85,000",
      badge: null,
      stock: "in",
      description: "Professional-grade MIG/MAG inverter welding machine with synergic control. Suitable for steel, stainless steel, and aluminium welding.",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
        "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80",
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80"
      ],
      specs: {
        "Welding Current": "30-350 A",
        "Duty Cycle (60%)": "350 A",
        "Input Voltage": "3Ph 380V/50Hz",
        "Wire Diameter": "0.8-1.6 mm",
        "Wire Feed Speed": "1.5-20 m/min",
        "Process": "MIG/MAG/FCAW",
        "Weight": "38 kg"
      }
    },
    {
      id: 4,
      name: "Hydraulic H-Frame Press HP-100T",
      category: "press",
      categoryLabel: "Hydraulic Press",
      price: "₹2,80,000",
      badge: null,
      stock: "out",
      description: "100-tonne H-frame hydraulic press for straightening, forming, pressing, and assembly operations in automotive workshops.",
      image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80",
        "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80",
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80"
      ],
      specs: {
        "Pressing Force": "100 Tonnes",
        "Daylight": "1200 mm",
        "Bed Size": "850 x 580 mm",
        "Stroke": "400 mm",
        "Cylinder Bore": "200 mm",
        "Motor": "5.5 kW / 1450 RPM",
        "Weight": "3800 kg"
      }
    },
    {
      id: 5,
      name: "Radial Drilling Machine RDM-50",
      category: "drilling",
      categoryLabel: "Drilling",
      price: "₹1,65,000",
      badge: null,
      stock: "in",
      description: "Heavy-duty radial arm drilling machine ideal for large workpieces. Features motorized column clamping and all-geared head.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
        "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80"
      ],
      specs: {
        "Column Diameter": "200 mm",
        "Arm Length": "1500 mm",
        "Spindle Travel": "350 mm",
        "Spindle Speeds": "9 steps (40-1400 RPM)",
        "Taper": "MT-4",
        "Motor": "3.7 kW",
        "Max Drill Size": "50 mm"
      }
    },
    {
      id: 6,
      name: "VMC Machining Center V-650",
      category: "cnc",
      categoryLabel: "CNC Machine",
      price: "₹38,00,000",
      badge: "PREMIUM",
      stock: "in",
      description: "3-axis vertical machining center for precision mould making, aerospace, and defence components. BT-40 spindle taper with 10,000 RPM.",
      image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80",
        "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80",
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80"
      ],
      specs: {
        "Table Size": "1200 x 650 mm",
        "X/Y/Z Travel": "1000/650/600 mm",
        "Spindle Speed": "10,000 RPM",
        "Spindle Taper": "BT-40",
        "Tool Magazine": "24 ATC",
        "Controller": "Fanuc 0i-MF",
        "Rapid Feed": "36 m/min",
        "Weight": "9500 kg"
      }
    }
  ],

  gallery: {
    photos: [
      { src: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=700&q=80", caption: "CNC Workshop Floor" },
      { src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=700&q=80", caption: "Welding Operation" },
      { src: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=700&q=80", caption: "Hydraulic Press Room" },
      { src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=700&q=80", caption: "Drilling Section" },
      { src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&q=80", caption: "Lathe Machine Bay" },
      { src: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=700&q=80", caption: "Dispatch Area" },
      { src: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=700&q=80", caption: "Quality Control" },
      { src: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=700&q=80", caption: "Machine Assembly" },
      { src: "https://images.unsplash.com/photo-1625134673337-519d4d10b313?w=700&q=80", caption: "Precision Machining" },
      { src: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=700&q=80", caption: "Factory Floor Overview" },
      { src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=700&q=80", caption: "Certified Technicians" },
      { src: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=700&q=80", caption: "Customer Installation" }
    ],
    videos: [
      { type: "youtube", id: "dQw4w9WgXcQ", caption: "CNC Machine Demo — TC-500 in Action" },
      { type: "youtube", id: "dQw4w9WgXcQ", caption: "Installation Process — Our Technicians at Work" },
      { type: "youtube", id: "dQw4w9WgXcQ", caption: "Customer Testimonial — Raj Engineering, Pune" }
    ]
  },

  reviews: [
    {
      name: "Rajesh Mehta",
      company: "Mehta Auto Parts, Pune",
      rating: 5,
      text: "Bought the CNC Turning Center 8 months ago. The machine has been running 2 shifts daily without a single issue. Installation team was professional and after-sales support is excellent.",
      product: "CNC Turning Center TC-500",
      avatar: null
    },
    {
      name: "Suresh Pillai",
      company: "South Tech Industries, Chennai",
      rating: 5,
      text: "SteelCraft is genuinely different from other dealers. They helped me select the right lathe for my budget and ensured proper training was given to my operators. 10/10 would recommend.",
      product: "Lathe Machine L-400",
      avatar: null
    },
    {
      name: "Amandeep Singh",
      company: "Punjab Fabricators, Ludhiana",
      rating: 5,
      text: "The MIG welding machine quality is top-notch. Spatter is minimal and arc stability is superb. Got my GST invoice the same day. Delivery in 5 days to Ludhiana — impressive!",
      product: "MIG Welding Machine WM-350",
      avatar: null
    },
    {
      name: "Prakash Desai",
      company: "Desai Workshop, Ahmedabad",
      rating: 4,
      text: "Competitive pricing and genuine machines. The hydraulic press has been a workhorse for straightening axle shafts. Very happy with the purchase. Slight delay in delivery but worth it.",
      product: "Hydraulic Press HP-100T",
      avatar: null
    },
    {
      name: "Mohammed Farooq",
      company: "Al-Farooq Engineering, Hyderabad",
      rating: 5,
      text: "We ordered the VMC Machining Center for our aerospace component division. The machine accuracy is exceptional. SteelCraft's team configured the control perfectly.",
      product: "VMC Machining Center V-650",
      avatar: null
    },
    {
      name: "Deepak Sharma",
      company: "Sharma and Sons, Delhi NCR",
      rating: 5,
      text: "Running 3 machines from SteelCraft now. Each time the experience is seamless from enquiry to commissioning. Their AMC plan is also very affordable and response time is fast.",
      product: "Multiple Machines",
      avatar: null
    }
  ]
};

function loadSiteData() {
  const saved = localStorage.getItem('steelcraft_data');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(SITE_DATA, parsed);
    } catch(e) { console.warn('Could not load saved data:', e); }
  }
}
function saveSiteData() {
  localStorage.setItem('steelcraft_data', JSON.stringify(SITE_DATA));
}
loadSiteData();
