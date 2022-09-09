
export const Navigation = [
    {
        menu: 'Dashboard',
        link: '',
        icon: 'icon-speedometer',
        child:[
            {
                submenu:'Principal',
                link:'/admin/dashboard',
                order:1
            }

        ],
        order: 1
    },
    {
        menu: 'Difusión',
        link: '/admin/difusion',
        icon: 'icons-Loudspeaker',
        child: [
            {
                submenu: 'Grupos',
                link:'/admin/difusion/grupos',
                order:1
            },
            {
                submenu: 'Documentos',
                link:'/admin/difusion/docs',
                order:2
            },
        ],
        order: 2,
    },
]