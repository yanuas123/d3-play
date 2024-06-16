import { Routes } from "../../constants/routing";

export interface LinkTemplateData {
  title: string;
  page: Routes;
  parameter?: [string, string];
}

export interface SectionTemplateData {
  title: string;
  links: LinkTemplateData[];
}
