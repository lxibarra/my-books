// May no longer be neded
export interface IFacebookLoginSuccess {
  additionalUserInfo: {
    isNewUser: boolean;
    profile: {
      email: string;
      first_name: string;
      id: string;
      last_name: string;
      name: string;
      picture: {
        data: {
          height: number
          is_silhouette: boolean;
          url: string;
          width: number;
        }
      }
    };
    providerId: string;
  };
  operationType: string;
}
