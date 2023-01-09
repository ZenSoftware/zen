import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  AuthRegister,
  AuthRegisterDocument,
  AuthRegisterGQL,
  AuthRegisterVariables,
} from '@zen/graphql';
import { ApolloTestingController } from 'apollo-angular/testing';

import { AUTH_DECLARATIONS, AUTH_IMPORTS, AUTH_PROVIDERS } from '../test-deps';
import { ZenRegisterFormComponent } from './zen-register-form.component';

describe('ZenRegisterFormComponent', () => {
  let component: ZenRegisterFormComponent;
  let fixture: ComponentFixture<ZenRegisterFormComponent>;
  let controller: ApolloTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [...AUTH_DECLARATIONS, ZenRegisterFormComponent],
      providers: [...AUTH_PROVIDERS, AuthRegisterGQL],
      imports: AUTH_IMPORTS,
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
    component.email.setValue('zen@me.ca');
    component.password.setValue('samplepass');
    component.passwordConfirm.setValue('samplepass');
    component.acceptTerms.setValue(true);
    expect(component.form.valid).toEqual(true);

    component.onSubmit();
    const op = controller.expectOne(AuthRegisterDocument);

    const variables: AuthRegisterVariables = {
      data: {
        username: 'zen',
        email: 'zen@me.ca',
        password: 'samplepass',
      },
    };
    expect(op.operation.variables).toEqual(variables);

    const data: AuthRegister = {
      authRegister: {
        __typename: 'AuthSession',
        userId: 'abc123',
        expiresIn: 1000,
        rememberMe: true,
        roles: ['Super'],
        token: '1234',
        rules: [{ action: 'manage', subject: 'all' }],
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
