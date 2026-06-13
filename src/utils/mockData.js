export const MOCK_ANALYSES = [
  {
    id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    filename: "family_reunion_chat.txt",
    file_size_bytes: 148200,
    total_messages: 14205,
    total_words: 85230,
    media_shared: 412,
    links_shared: 94,
    created_at: "2026-06-13T08:00:00Z",
    active_users: [
      { sender_name: "Alice Smith", message_count: 5120, word_count: 32400 },
      { sender_name: "Bob Jones", message_count: 4200, word_count: 24900 },
      { sender_name: "Charlie Brown", message_count: 2800, word_count: 17200 },
      { sender_name: "Diana Prince", message_count: 2085, word_count: 10730 }
    ],
    emoji_analysis: [
      { emoji: "😂", count: 420 },
      { emoji: "❤️", count: 315 },
      { emoji: "👍", count: 280 },
      { emoji: "🎉", count: 189 },
      { emoji: "🔥", count: 142 },
      { emoji: "🙌", count: 120 }
    ],
    monthly_timeline: [
      { month_year: "Jan 2026", message_count: 1800 },
      { month_year: "Feb 2026", message_count: 2100 },
      { month_year: "Mar 2026", message_count: 2900 },
      { month_year: "Apr 2026", message_count: 3400 },
      { month_year: "May 2026", message_count: 4005 }
    ],
    daily_activity: [
      { name: "Mon", message_count: 120 },
      { name: "Tue", message_count: 180 },
      { name: "Wed", message_count: 250 },
      { name: "Thu", message_count: 310 },
      { name: "Fri", message_count: 420 },
      { name: "Sat", message_count: 530 },
      { name: "Sun", message_count: 380 }
    ],
    ai_insights: {
      toxicity_score: 0.03,
      detected_language: "English",
      ai_summary: "The WhatsApp transcript records positive coordination and logistics planning for the Smith-Jones Family Reunion. The overall tone is encouraging, supportive, and cooperative, with zero structural toxicity and high mutual engagement.",
      topics_detected: ["Reunion Logistics", "Accommodation Booking", "Food & Dinner Catering", "Old Photo Sharing"],
      relationship_score: [
        { pair: "Alice ↔ Bob", score: 96, status: "High Affinity" },
        { pair: "Alice ↔ Charlie", score: 88, status: "Very Collaborative" },
        { pair: "Bob ↔ Diana", score: 75, status: "Warm & Friendly" }
      ]
    }
  },
  {
    id: "a7c29e1d-4f1a-4d2b-aa5f-6a9c8b7c3d1e",
    filename: "product_launch_team.txt",
    file_size_bytes: 84300,
    total_messages: 5820,
    total_words: 39400,
    media_shared: 184,
    links_shared: 215,
    created_at: "2026-06-10T14:32:00Z",
    active_users: [
      { sender_name: "Sarah (PM)", message_count: 2100, word_count: 15400 },
      { sender_name: "Alex (Dev)", message_count: 1850, word_count: 12100 },
      { sender_name: "Mike (Design)", message_count: 1120, word_count: 8200 },
      { sender_name: "Emma (Marketing)", message_count: 750, word_count: 3700 }
    ],
    emoji_analysis: [
      { emoji: "🚀", count: 245 },
      { emoji: "👍", count: 180 },
      { emoji: "👀", count: 124 },
      { emoji: "🙏", count: 98 },
      { emoji: "🔥", count: 85 }
    ],
    monthly_timeline: [
      { month_year: "Mar 2026", message_count: 1100 },
      { month_year: "Apr 2026", message_count: 2200 },
      { month_year: "May 2026", message_count: 2520 }
    ],
    daily_activity: [
      { name: "Mon", message_count: 280 },
      { name: "Tue", message_count: 320 },
      { name: "Wed", message_count: 450 },
      { name: "Thu", message_count: 410 },
      { name: "Fri", message_count: 390 },
      { name: "Sat", message_count: 90 },
      { name: "Sun", message_count: 60 }
    ],
    ai_insights: {
      toxicity_score: 0.01,
      detected_language: "English",
      ai_summary: "Professional work group focusing on task deadlines, layout reviews, and beta-launch bug triages. Highly action-oriented communication with minor task-related tensions, resolved constructively.",
      topics_detected: ["Beta Triage", "Landing Redesign", "Social Media Plan", "API Deployment"],
      relationship_score: [
        { pair: "Sarah ↔ Alex", score: 92, status: "Strong Cooperation" },
        { pair: "Sarah ↔ Mike", score: 85, status: "Aligned Design Loop" },
        { pair: "Alex ↔ Mike", score: 78, status: "Productive Feedback" }
      ]
    }
  }
];

export const MOCK_USER = {
  name: "Jane Doe",
  email: "jane.doe@whatsinsight.ai",
  plan: "Premium Creator",
  analyses_count: 14,
  joined_date: "June 2025"
};
