import { sharedIdentifiers } from "../../constants/general";
import { SAMPLE_ROUTING_PARAMETER_KEY } from "../../constants/routing";
import { SampleIdentifier, samplesTitles } from "@samples/samples";
import { ApplyDataFn } from "../../models/general";
import { LinkTemplateData, SectionTemplateData } from "./home-page.models";
import { Template, getElement, setElementText } from "../../utils/general";
import { Routes } from '../../constants/routing';
import { Router } from "../../models/routing";
import { fromEvent } from "rxjs";

export function createLinksDataFromSampleIdentifiers(identifiers: SampleIdentifier[]): LinkTemplateData[] {
  return identifiers.map((identifier) => ({
    title: samplesTitles[identifier],
    page: Routes.sample,
    parameter: [SAMPLE_ROUTING_PARAMETER_KEY, identifier]
  }));
}

export function applySectionDataFnFactory(router: Router): ApplyDataFn<HTMLElement, SectionTemplateData> {
  return (template, data) => {
    const titleElement: HTMLElement = getElement(sharedIdentifiers.sectionTitle, template);
    const contentElement: HTMLElement = getElement(sharedIdentifiers.sectionContent, template);

    const linkTemplate: Template<HTMLButtonElement, LinkTemplateData> = new Template(
      sharedIdentifiers.pageLink,
      contentElement,
      applyLinkDataFn
    );

    setElementText(data.title, titleElement);

    data.links.forEach((linkData) => {
      const linkButton: HTMLButtonElement = linkTemplate.insert(linkData);

      fromEvent(linkButton, 'click').subscribe(() => {
        router.redirect(linkData.page, linkData.parameter);
      });
    });
  };
}

export const applyLinkDataFn: ApplyDataFn<HTMLButtonElement, LinkTemplateData> = (template, data) => {
  setElementText(data.title, template);
};
