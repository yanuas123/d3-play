import { ApplyDataFn } from "../../models/general";
import { HIDDEN_CLASS, featuredIdentifiers, sharedIdentifiers } from "../../constants/general";
import { sectionsData } from "./home-page.constants";
import { SectionTemplateData } from "./home-page.models";
import { Template, elementClassToggler, getElement } from "../../utils/general";
import { applySectionDataFnFactory } from "./home-page.utils";
import { Page, Router } from '../../models/routing';

export class HomePage implements Page {
  private host: HTMLElement;

  private sectionTemplate: Template<HTMLElement, SectionTemplateData>;

  private hiddenClass: ReturnType<typeof elementClassToggler>;

  constructor(private router: Router) {
    this.initializeElements();
    this.addSections();
  }

  public show(): void {
    this.hiddenClass.show(false);
  }

  public hide(): void {
    this.hiddenClass.show(true);
  }

  private initializeElements(): void {
    const applySectionDataFn: ApplyDataFn<HTMLElement, SectionTemplateData> = applySectionDataFnFactory(this.router);

    this.host = getElement(featuredIdentifiers.homePage);
    this.sectionTemplate = new Template(sharedIdentifiers.section, this.host, applySectionDataFn);

    this.hiddenClass = elementClassToggler(HIDDEN_CLASS, this.host);
  }

  private addSections(): void {
    sectionsData.forEach((sectionData) => {
      this.sectionTemplate.insert(sectionData);
    });
  }
}
