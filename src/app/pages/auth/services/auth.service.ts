import { Injectable } from '@angular/core';
import {
  ApiError,
  createClient,
  Session,
  SupabaseClient,
  User,
  UserCredentials,
} from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { USER_STORAGE_KEY } from '../../../shared/constants/constants';

type supabaseResponse = User | Session | ApiError | null;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabaseClient: SupabaseClient;
  private userSubject = new BehaviorSubject<User | null>(null);

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  constructor() {
    this.supabaseClient = createClient(
      environment.supabase.url,
      environment.supabase.publicKey
    );
    this.setUser();
  }

  async signIn(credentials: UserCredentials): Promise<supabaseResponse> {
    try {
      const { user, error, ...rest } = await this.supabaseClient.auth.signIn(
        credentials
      );
      this.setUser();
      return error ? error : user;
    } catch (error) {
      return error as ApiError;
    }
  }

  async signUp(credentials: UserCredentials): Promise<supabaseResponse> {
    try {
      const { user, error, ...rest } = await this.supabaseClient.auth.signUp(
        credentials
      );
      this.setUser();
      return error ? error : user;
    } catch (error) {
      return error as ApiError;
    }
  }

  signOut(): Promise<{ error: ApiError | null }> {
    this.userSubject.next(null);
    return this.supabaseClient.auth.signOut();
  }

  private setUser(): void {
    const session = localStorage.getItem(USER_STORAGE_KEY) as unknown as User;
    this.userSubject.next(session);
  }
}
