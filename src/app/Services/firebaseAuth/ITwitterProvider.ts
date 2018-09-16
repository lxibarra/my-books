export interface ITwitterLoginSuccess {
  additionalUserInfo: {
    isNewUser: boolean;
    profile: {
      description: string;
      location: string;
      name: string;
      profile_image_url: string;
      screen_name: string;
    };
    providerId: string;
    username: string;
  };
  operationType: string;
}
