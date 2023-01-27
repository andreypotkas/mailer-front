export interface IIMapMessage {
    date: string
    from: IIMapMessageMember[]
    messageId: string
    replyTo: IIMapMessageMember[]
    sender: IIMapMessageMember[]
    subject : string
    to: IIMapMessageMember[]
    
    }
    
export interface IIMapMessageMember {
    name: string
    address: string
}

export interface IGoogleLoginResponse{
	email:string
	firstName:string
	lastName:string
	picture:string
	accessToken:string
}