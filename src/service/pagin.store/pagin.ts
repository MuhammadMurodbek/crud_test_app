import { create } from 'zustand'
interface Tprops {
    filter: {
        categories: string[]
        selectedCategory: string
        _limit: number
        _page: number
        _total: number | null
        name_like: string
    }
    setFilter: any
}
export const useFilter = create<Tprops>((set) => ({
    filter: {
        categories: [''],
        selectedCategory: '',
        _limit: 4,
        _page: 1,
        _total: null,
        name_like: '',
    },
    setFilter: (payload: any) => set(() => ({ filter: payload })),
}))
