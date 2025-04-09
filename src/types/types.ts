export interface ICrypto {
    id: string
    price: number,
    name: string,
    icon: string
}

export interface IAsset {
    id: string
    price: number
    amount: number
    date?: Date
    grow?: boolean
    growPercent?: number
    totalAmount?: number
    totalProfit?: number
} 
export interface ICryptoContext {
	crypto: ICrypto[]
	assets: IAsset[]
	loading: boolean
}