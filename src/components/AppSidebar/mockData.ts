import { LayoutList } from "lucide-react";

export const MOCK_DATA = {
  user: {
    name: "Hey Now",
    email: "Youareonallstar@hey.com",
    avatar: "/beauty.jpg",
  },
  navMain: [
    {
      title: "To-Do Lists",
      url: "#",
      icon: LayoutList,
      isActive: true,
      items: [
        {
          title: "Work",
          url: "#",
        },
        {
          title: "Trip to Greece",
          url: "#",
        },
        {
          title: "Apartment renovation",
          url: "#",
        },
      ],
    },
  ],
};
