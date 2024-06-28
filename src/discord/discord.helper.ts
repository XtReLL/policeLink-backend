export class DiscordHelper {
  static getUserAvatarUrl(id: string, avatar: string | null) {
    const DefaultAvatars: Record<string, string> = {
      BLURPLE: '6debd47ed13483642cf09e832ed0bc1b',
      GREY: '322c936a8c8be1b803cd94861bdfa868',
      GREEN: 'dd4dbc0016779df1378e7812eabaa04d',
      ORANGE: '0e291f67c9274a1abdddeb3fd919cbaa',
      RED: '1cbd08c76f8af6dddce02c5138971129',
    };

    const avatars = Object.keys(DefaultAvatars);
    const defaultAvatar =
      DefaultAvatars[avatars[(avatars.length * Math.random()) << 0]];

    const userDefaultAvatar = `https://discordapp.com/assets/${DefaultAvatars[defaultAvatar]}.png`;

    return avatar
      ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
      : userDefaultAvatar;
  }
  static isTokenExpired(expiresInSeconds: number) {
    const expirationTime = Date.now() + expiresInSeconds * 1000;

    const isExpired = expirationTime < Date.now();

    return isExpired;
  }

  static getGuildIconUrl(id: string, icon: string | null) {
    return icon ? `https://cdn.discordapp.com/icons/${id}/${icon}.png` : null;
  }
}
