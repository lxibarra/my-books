export interface IProfile {
  profileUrl: string;
  publicFullName: string;
  identityProfileName?: string; // full name returned by the identity provider.
}
