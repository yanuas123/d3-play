import { SectionTemplateData } from "./home-page.models";
import { createLinksDataFromSampleIdentifiers } from "./home-page.utils";
import { SampleIdentifier } from "@samples/samples";

export const sectionsData: SectionTemplateData[] = [{
  title: 'Section',
  links: createLinksDataFromSampleIdentifiers([
    SampleIdentifier.test
  ])
}];
