declare namespace Cypress {
  interface Chainable {
    getBySel(selector: string, args?): Chainable<JQuery<HTMLElement>>;

    toMatchImageSnapshot(args?: {
      imageConfig?: {
        createDiffImage?: boolean;
        threshold?: number;
        thresholdType?: 'pixel' | 'percent';
      };
      name?: string;
      separator?: string;
    }): Chainable<Element>;

    toMatchSnapshot(args?: {
      ignoreExtraFields: boolean;
      ignoreExtraArrayItems: boolean;
      normalizeJson: boolean;
      replace: {
        [key: string]: string | number | boolean | null | undefined;
      };
    }): Chainable<Element>;
  }
}
