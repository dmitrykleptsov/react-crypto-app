import { Layout, Card, Statistic, List, Typography, Spin, Tag } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { fakeFetchCrypto, fetchAssets } from '../../api'
import { capitalize, percentDiff } from '../../utils'
import { IAsset, ICrypto } from '../../types/types'

const siderStyle: React.CSSProperties = {
	padding: '1rem'
}

const AppSider: React.FC = () => {
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

	if (loading) {
		return <Spin fullscreen />
	}

	return (
		<Layout.Sider width='25%' style={siderStyle}>
			{assets.map(asset => (
				<Card key={asset.id} style={{ marginBottom: '1rem' }}>
					<Statistic
						title={capitalize(asset.id)}
						value={asset.totalAmount}
						precision={2}
						valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
						prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
						suffix='$'
					/>
					<List
						size='small'
						dataSource={[
							{ title: 'Total Profit', value: asset.totalProfit, withTag: true },
							{ title: 'Asset Amount', value: asset.amount, isPlain: true }
							// { title: 'Difference', value: asset.growPercent }
						]}
						renderItem={item => (
							<List.Item>
								<span>{item.title}</span>
								<span>
									{item.withTag && (
										<Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>
									)}
									{item.isPlain && item.value}
									{!item.isPlain && (
										<Typography.Text type={asset.grow ? 'success' : 'danger'}>
											{item.value?.toFixed(2)}$
										</Typography.Text>
									)}
								</span>
							</List.Item>
						)}
					/>
				</Card>
			))}
		</Layout.Sider>
	)
}

export default AppSider
