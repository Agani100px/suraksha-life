export interface ACFImage {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: {
    thumbnail: string;
    "thumbnail-width": number;
    "thumbnail-height": number;
    medium: string;
    "medium-width": number;
    "medium-height": number;
    medium_large: string;
    "medium_large-width": number;
    "medium_large-height": number;
    large: string;
    "large-width": number;
    "large-height": number;
    "1536x1536": string;
    "1536x1536-width": number;
    "1536x1536-height": number;
    "2048x2048": string;
    "2048x2048-width": number;
    "2048x2048-height": number;
  };
}

export interface HeroSectionData {
  acf_fc_layout: string;
  doctor_title: string;
  doctor_name: string;
  doctor_sub_title: string;
  doctor_hero_description: string;
  doctor_hero_image: ACFImage;
  button_1: string;
  button_1_link: string;
}

export interface NavBarItem {
  acf_fc_layout: string;
  nav_bar_tab_name: string;
  tab_link: string;
}

export interface FacilityItem {
  acf_fc_layout: string;
  facilities_icon: ACFImage;
  facility_title: string;
  facility_description: string;
}

// Services Section Types
export interface ServiceItem {
  id: number;
  acf: {
    service_title: string;
    service_icon: ACFImage;
    service_description: string;
  };
}

export interface ACFData {
  hero: HeroSectionData[];
  nav_bar: NavBarItem[];
  button_header: string;
  button_header_link: string;
  sf_title: string;
  sf_section_title: string;
  facilities_list: FacilityItem[];
  // About Me Section
  am_title: string;
  am_doctor_name: string;
  doctor_about_description: string;
  doctor_about_image: ACFImage;
  button_2: string;
  button_2_link: string;
  // Services Section
  ser_title: string;
  ser_section_title: string;
  ser_sub_title: string;
  service_available_time: string;
  services_list: ServiceItem[];
}
