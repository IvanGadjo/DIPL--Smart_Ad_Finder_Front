import { DocumentAddIcon, ClockIcon, InformationCircleIcon, AdjustmentsIcon, PencilIcon, EyeOffIcon } from '@heroicons/react/solid'


export const howToSteps = [
    {
        id: 1,
        content: 'Внесете барање на почетната страна со клик на ',
        target: '„ново барање“',
        icon: DocumentAddIcon,
        iconBackground: 'bg-green-400',
    },
    {
        id: 2,
        content: 'Потребни се 30 секунди за алгоритмот да пронајде резултати',
        target: '',
        icon: ClockIcon,
        iconBackground: 'bg-blue-500',
    },
    {
        id: 3,
        content: 'Резултатите се видливи на почетната страница',
        target: 'инстантно',
        icon: InformationCircleIcon,
        iconBackground: 'bg-green-500',
    },
    {
        id: 4,
        content: 'Филтрирај ги најдените резултати според ',
        target: 'категорија или регион',
        icon: AdjustmentsIcon,
        iconBackground: 'bg-yellow-500',
    },
    {
        id: 5,
        content: 'Ако се работи за автомобил, филтрирај и според ',
        target: 'година и километража',
        icon: AdjustmentsIcon,
        iconBackground: 'bg-yellow-500',
    },
    {
        id: 6,
        content: 'Измени го твоето барање по потреба со клик на ',
        target: '„промени“',
        icon: PencilIcon,
        iconBackground: 'bg-gray-500',
    },
    {
        id: 7,
        content: 'Деактивирај го твоето барање ако нема потреба од порнаоѓање нови огласи',
        target: '',
        icon: EyeOffIcon,
        iconBackground: 'bg-gray-500',
    },
  ]