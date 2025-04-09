import { cryptoAssets, cryptoData } from './data'
import { IAsset, ICrypto } from './types/types'

export function fakeFetchCrypto(): Promise<{ result: ICrypto[] }> {
    return new Promise(res => {
        setTimeout(() => {
            res(cryptoData)
        }, 1)
    })
}

export function fetchAssets(): Promise<IAsset[]> {
    return new Promise(res => {
        setTimeout(() => {
            res(cryptoAssets)
        }, 1)
    })
}