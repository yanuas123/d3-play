import { SectionTemplateData } from "./home-page.models";
import { createLinksDataFromSampleIdentifiers } from "./home-page.utils";
import { SampleIdentifier } from "@samples/constants";

export const sectionsData: SectionTemplateData[] = [{
  title: 'Double collection',
  links: createLinksDataFromSampleIdentifiers([
    SampleIdentifier.doubleCircle,
    SampleIdentifier.redSquare,
    SampleIdentifier.slidingSlices
  ])
}];
