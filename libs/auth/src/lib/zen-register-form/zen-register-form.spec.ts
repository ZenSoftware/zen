import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ZenComponentsModule } from '@zen/components';
import {
  AuthRegister,
  AuthRegisterDocument,
  AuthRegisterGQL,
  AuthRegisterVariables,
} from '@zen/graphql';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

import { ZenRegisterFormComponent } from './zen-register-form.component';

describe('ZenRegisterFormComponent', () => {
  let component: ZenRegisterFormComponent;
  let fixture: ComponentFixture<ZenRegisterFormComponent>;
  let controller: ApolloTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ZenRegisterFormComponent],
      providers: [AuthRegisterGQL],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ApolloTestingModule,
        ZenComponentsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZenRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    controller = TestBed.inject(ApolloTestingController);
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should register user', done => {
    component.username.setValue('zen');
    component.email.setValue('me@zen.ca');
    component.password.setValue('samplepass');
    component.passwordConfirm.setValue('samplepass');
    component.acceptTerms.setValue(true);
    expect(component.form.valid).toEqual(true);

    component.onSubmit();
    const op = controller.expectOne(AuthRegisterDocument);

    const variables: AuthRegisterVariables = {
      data: {
        username: 'zen',
        email: 'me@zen.ca',
        password: 'samplepass',
      },
    };
    expect(op.operation.variables).toEqual(variables);

    const data: AuthRegister = {
      authRegister: {
        __typename: 'AuthSession',
        id: 1,
        expiresIn: 1000,
        rememberMe: true,
        roles: ['Super'],
        token: '1234',
      },
    };

    component.registered.subscribe(authSession => {
      expect(authSession).toEqual(data.authRegister);
      done();
    });

    op.flush({ data });

    controller.verify();
  });
});
