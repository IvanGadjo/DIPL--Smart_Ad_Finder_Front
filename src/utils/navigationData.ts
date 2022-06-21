import {
    CalendarIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
  } from '@heroicons/react/outline';




export const navigation = [
    { name: 'Почетна', href: 'home', icon: HomeIcon, current: true },
    { name: 'Огласи', href: 'advertisments', icon: UsersIcon, current: false },
    { name: 'Како работи', href: 'howItWorks', icon: FolderIcon, current: false },
    { name: 'Подесувања и профил', href: 'settings', icon: CalendarIcon, current: false },
]


