import { Page, Router } from "../../models/routing";
import { elementClassToggler, getElement, setElementText } from "../../utils/general";
import { featuredIdentifiers, HIDDEN_CLASS } from "../../constants/general";
import { SAMPLE_ROUTING_PARAMETER_KEY, Routes } from "../../constants/routing";
import { SampleIdentifier, sampleIdentifiers, samplesContents, samplesTitles } from "@samples/samples";
import { fromEvent } from "rxjs";

export class SamplePage implements Page {
  private sampleIdentifier: SampleIdentifier;

  private host: HTMLElement;
  private pageTitle: HTMLSpanElement;
  private homeButton: HTMLButtonElement;
  private nextButton: HTMLButtonElement;
  private previousButton: HTMLButtonElement;
  private content: HTMLElement;

  private hiddenClass: ReturnType<typeof elementClassToggler>;

  constructor(private router: Router) {
    this.initializeElements();
    this.listenRouterButtons();
  }

  public show([parameterKey, parameterValue]: [string, string]): void {
    if (parameterKey === SAMPLE_ROUTING_PARAMETER_KEY) {
      this.sampleIdentifier = parameterValue as SampleIdentifier;
    }

    this.hiddenClass.show(false);
    this.initializeSamplePage();
  }

  public hide(): void {
    this.hiddenClass.show(true);
    this.removePageContent();
  }

  private initializeElements(): void {
    this.host = getElement(featuredIdentifiers.samplePage);
    this.pageTitle = getElement(featuredIdentifiers.pageTitle);
    this.homeButton = getElement(featuredIdentifiers.homeButton);
    this.nextButton = getElement(featuredIdentifiers.nextPageButton);
    this.previousButton = getElement(featuredIdentifiers.previousPageButton);
    this.content = getElement(featuredIdentifiers.pageContent);

    this.hiddenClass = elementClassToggler(HIDDEN_CLASS, this.host);
  }

  private listenRouterButtons(): void {
    fromEvent(this.homeButton, 'click').subscribe(() => {
      this.router.redirect(Routes.home);
    });
    fromEvent(this.nextButton, 'click').subscribe(() => {
      this.nextSample();
    });
    fromEvent(this.previousButton, 'click').subscribe(() => {
      this.previousSample();
    });
  }

  private manageRouterButtonsState(): void {
    const currentSampleIndex: number = sampleIdentifiers.indexOf(this.sampleIdentifier);
    const isFirstSample: boolean = currentSampleIndex === 0;
    const isLastSample: boolean = currentSampleIndex === (sampleIdentifiers.length - 1);

    this.previousButton.disabled = false;
    this.nextButton.disabled = false;

    if (isFirstSample) {
      this.previousButton.disabled = true;
    }

    if (isLastSample) {
      this.nextButton.disabled = true;
    }
  }

  private nextSample(): void {
    const currentSampleIndex: number = sampleIdentifiers.indexOf(this.sampleIdentifier);
    const nextSampleIndex: number = currentSampleIndex + 1;
    const nextSample: SampleIdentifier = sampleIdentifiers[nextSampleIndex];

    this.router.redirect(Routes.sample, [SAMPLE_ROUTING_PARAMETER_KEY, nextSample]);
  }

  private previousSample(): void {
    const currentSampleIndex: number = sampleIdentifiers.indexOf(this.sampleIdentifier);
    const prevSampleIndex: number = currentSampleIndex - 1;
    const prevSample: SampleIdentifier = sampleIdentifiers[prevSampleIndex];

    this.router.redirect(Routes.sample, [SAMPLE_ROUTING_PARAMETER_KEY, prevSample]);
  }

  private initializeSamplePage(): void {
    this.setPageTitle();
    this.manageRouterButtonsState();
    this.addPageContent();
  }

  private setPageTitle(): void {
    const title: string = samplesTitles[this.sampleIdentifier];

    setElementText(title, this.pageTitle);
  }

  private addPageContent(): void {
    samplesContents[this.sampleIdentifier](this.content);
  }

  private removePageContent(): void {
    this.content.replaceChildren();
  }
}
