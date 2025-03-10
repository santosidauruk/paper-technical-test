import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { User } from '../../shared/types/user.type';
import { UsersService } from '../../services/users.service';

const mockUser: User = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
  street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496"
    }
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets"
  }
}

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let userService: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent],
      
      providers: [
        { provide: UsersService },
        provideRouter(routes),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
  });

  it('should render app spinner on user detail', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    expect(compiled.querySelector("div[role='status']")).toBeTruthy();
  });

  it('should render user detail', async () => {
    spyOn(userService, "fetchUserById").and.resolveTo(mockUser)
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.user()).toEqual(mockUser)
    expect(compiled.querySelector('h5')?.textContent).toContain("Leanne Graham")
  });

  it('should render error message on user list', async () => {
    const errMsg = "Error fetching detail"
    spyOn(userService, "fetchUserById").and.rejectWith(new Error(errMsg))
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.error()).toBe(errMsg)
    expect(compiled.querySelector('app-alert')).toBeTruthy();
  });

});
