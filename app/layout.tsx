import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '卡尔德保险 · 报案材料核对台',
  description: '只读核对单笔首次报案材料，展示已收到、缺失、冲突与判断依据。',
  openGraph: { title:'卡尔德保险 · 报案材料核对台', description:'一笔报案，一次看清材料状态。', type:'website' }
};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  return <html lang="zh-CN"><body>{children}</body></html>
}
