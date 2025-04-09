import React, { createContext, useState, useEffect } from 'react'
import { fakeFetchCrypto, fetchAssets } from '../api'
import { ICrypto, IAsset, ICryptoContext } from '../types/types'
import { percentDiff } from '../utils'

const CryptoContext = createContext<ICryptoContext>({
	crypto: [],
	assets: [],
	loading: false
})

export function CryptoContextProvider({ children }: { children: React.ReactNode }) {
	const [loading, setLoading] = useState(false)
	const [crypto, setCrypto] = useState<ICrypto[]>([])
	const [assets, setAssets] = useState<IAsset[]>([])

	useEffect(() => {
		async function preload() {
			setLoading(true)
			const { result } = await fakeFetchCrypto()
			const assets = await fetchAssets()

			setAssets(
				assets.map(asset => {
					const coinPrice = result.find(item => item.id === asset.id)?.price ?? asset.price
					const currentAmount = asset.amount * coinPrice
					return {
						grow: asset.price < coinPrice,
						growPercent: percentDiff(asset.price, coinPrice),
						totalAmount: currentAmount,
						totalProfit: currentAmount - asset.amount * asset.price,
						...asset
					}
				})
			)
			setCrypto(result)
			setLoading(false)
		}

		preload()
	}, [])

	return <CryptoContext.Provider value={{ crypto, assets, loading }}>{children}</CryptoContext.Provider>
}

export default CryptoContext
