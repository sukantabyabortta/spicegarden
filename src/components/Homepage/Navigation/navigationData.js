// navigationData.js (or keep at top of Navigation.jsx)

const navData = [
  {
    label: "Home",
    path: "https://sukantabyabortta.github.io/spicegarden"
  },
  {
    label: "About",
    path: "/about",
    dropdown: [
      { label: "Our Story", path: "/our-story" },
      { label: "Meet the Chef", path: "/meet-the-chef" },
      { label: "Awards", path: "/awards" },
      { label: "Enquiry", path: "/enquiry" }
    ]
  },
  {
    label: "Menu",
    path: "/menu"
  },
  {
    label: "Gallery",
    path: "/gallery"
  },
  {
    label: "Service",
    path: "/service"
  },
  {
    label: "Contact",
    path: "/contact"
  },
];

export default navData;
