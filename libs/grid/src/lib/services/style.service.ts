import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StyleService {
  private _headElement?: HTMLHeadElement;

  private get headElement() {
    if (!this._headElement && document.getElementsByTagName('head').length > 0) {
      this._headElement = document.getElementsByTagName('head')[0];
    }
    return this._headElement;
  }

  private _cssStyleSheet?: CSSStyleSheet;

  private get cssStyleSheet() {
    if (!this._cssStyleSheet) {
      if (!document.styleSheets || this.headElement === null) return null;
      // Get the first style sheet that is enabled and mediaText is empty or screen.
      this._cssStyleSheet = Array.from(document.styleSheets).find(
        s =>
          !s.disabled &&
          (s.media.mediaText === '' || s.media.mediaText.indexOf('screen') !== -1) &&
          (!s.href || s.href.startsWith(window.location.origin))
      ) as CSSStyleSheet;

      // If the style sheet doesn't exist yet, then create it.
      if (!this._cssStyleSheet) this._cssStyleSheet = this.createCssStyleSheet();
    }
    return this._cssStyleSheet;
  }

  public setStyle(selectorText: string, styleName: string, value: string): void {
    const rule = this.getStyleRule(selectorText);
    if (!rule) return;
    rule.style[styleName as any] = value;
  }

  public setStyles(
    selectorText: string,
    styles: { [styleName: string]: string } | CSSStyleDeclaration
  ) {
    const rule = this.getStyleRule(selectorText);
    if (!rule) return;
    Object.keys(styles).forEach(styleName => {
      rule.style[styleName as any] = (<any>styles)[styleName];
    });
  }

  private createCssStyleSheet(): CSSStyleSheet {
    // Create the style sheet element.
    const styleSheetElement = document.createElement('style');
    // styleSheetElement.type = 'text/css';
    // Append the style sheet element to the head.
    this.headElement?.appendChild(styleSheetElement);
    return styleSheetElement.sheet as CSSStyleSheet;
  }

  private getStyleRule(selectorText: string) {
    if (!this.cssStyleSheet) return;
    const rules: CSSRuleList = this.cssStyleSheet.cssRules;

    let rule: CSSStyleRule = Array.from(rules).find(
      r => r instanceof CSSStyleRule && r.selectorText.toLowerCase() === selectorText.toLowerCase()
    ) as CSSStyleRule;
    // If the selector rule does not exist, create it.
    if (!rule) {
      const ruleIndex = this.cssStyleSheet.insertRule(selectorText + '{ }', rules.length);
      rule = rules[ruleIndex] as CSSStyleRule;
    }
    return rule;
  }
}
