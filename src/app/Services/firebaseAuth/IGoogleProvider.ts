// may no longer be needed
export interface IGoogleLoginSuccess  {
    additionalUserInfo: {
      isNewUser: boolean;
      profile: {
        email: string;
        family_name: string;
        gender: string;
        given_name: string;
        id: string;
        link: string;
        locale: string;
        name: string;
        picture: string;
        verified_email: boolean;
      }
    };
    operationType: string;
}
