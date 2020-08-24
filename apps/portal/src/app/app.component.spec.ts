import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Environment, EnvironmentCommonDev } from '@zen/common';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule],
      providers: [{ provide: Environment, useValue: new EnvironmentCommonDev() }],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
