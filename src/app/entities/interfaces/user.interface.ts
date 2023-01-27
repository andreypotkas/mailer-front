export interface ITokens {
	accessToken: string;
	refreshToken: string;
}

export interface IUser {
	id: string;
	email: string;
	password: string;
	refreshToken: string;
	createdAt: Date;
	updatedAt: Date;
	role: string;
	avatar: IAvatar;
}

export interface IAvatar {
	createdAt: string;
	updatedAt: string;
	id: string;
	userId: string;
	filename: string;
	data: {
		type: string;
		data: Uint8Array;
	};
}

export interface IUserResponse {
	tokens: ITokens;
	user: IUser;
}

export interface IRole {
	id: string;
	value: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	UserRoles: IUserRole;
}

export interface IUserRole {
	id: string;
	roleId: string;
	userId: string;
}

export interface IProfileForm {
	id: string;
	firstName: string;
	lastName: string;
	birthday: Date;
	phone: string;
	address: string;
}
