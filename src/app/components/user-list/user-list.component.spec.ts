import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { User } from '../../shared/types/user.type';
import { UsersService } from '../../services/users.service';

const mockUsers: User[] = [
  {
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
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618"
      }
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains"
    }
  }
];

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [UsersService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
  });

  it('should render app spinner on user list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    expect(compiled.querySelector("div[role='status']")).toBeTruthy();
  });

  it('should render user list', async () => {
    spyOn(userService, "fetchUsers").and.resolveTo(mockUsers)
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.users()).toEqual(mockUsers)
    expect(compiled.querySelectorAll('th[scope="row"]').length).toEqual(2)
    expect(compiled.querySelectorAll('th[scope="row"]')[0].textContent).toContain("Leanne Graham")
    expect(compiled.querySelectorAll('th[scope="row"]')[1].textContent).toContain("Ervin Howell")
  });

  it('should render error message on user list', async () => {
    const errMsg = "Error fetching users"
    spyOn(userService, "fetchUsers").and.rejectWith(new Error(errMsg))
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.error()).toBe(errMsg)
    expect(compiled.querySelector('app-alert')).toBeTruthy();
  });
});
