let current_name = "";
let current_page = 0;
let pages = document.getElementsByClassName('basic_size');


let fighters_list = [
    {
        name : 'Jean Reno',
        hp : 120,
        image : "url('assets/images/fighters/reno.jpg')"
    },
    {
        name : 'Bootleg knight',
        hp : 70,
        image : "url('assets/images/fighters/knight.jpg')"
    },
    {
        name : 'Neil Breen',
        hp : 200,
        image : "url('assets/images/fighters/neil.png')"
    },
    {
        name : 'Artur Pirozhkov',
        hp : 150,
        image : "url('assets/images/fighters/artur.jpg')"
    },
    {
        name : 'Saul Goodman',
        hp : 90,
        image : "url('assets/images/fighters/saul.png')"
    },
    {
        name : 'Kurt Angle',
        hp : 110,
        image : "url('assets/images/fighters/kurt.jpg')"
    },
    {
        name : 'Vagabond',
        hp : 40,
        image : "url('assets/images/fighters/bum.png')"
    },
    {
        name : 'Donald Trump',
        hp : 180,
        image : "url('assets/images/fighters/trump.jpg')"
    },
    {
        name : 'Chuck Norris',
        hp : 120,
        image : "url('assets/images/fighters/norris.jpg')"
    },
    {
        name : 'Uwe Boll',
        hp : 160,
        image : "url('assets/images/fighters/uwe.jpg')"
    },
    {
        name : 'Jesus Christ',
        hp : 80,
        image : "url('assets/images/fighters/jesus.png')"
    },
    {
        name : 'Harold',
        hp : 75,
        image : "url('assets/images/fighters/harold.jpg')"
    },
    {
        name : 'Max Payne',
        hp : 140,
        image : "url('assets/images/fighters/max.jpg')"
    },
    {
        name : 'Joe Biden',
        hp : 90,
        image : "url('assets/images/fighters/biden.jpg')"
    },
    {
        name : 'Clint Eastwood',
        hp : 100,
        image : "url('assets/images/fighters/clint.jpeg')"
    },
    {
        name : 'Sam Hyde',
        hp : 180,
        image : "url('assets/images/fighters/sam.png')"
    },
    {
        name : 'John Travolta',
        hp : 110,
        image : "url('assets/images/fighters/john.jpg')"
    },
    {
        name : 'Roach King',
        hp : 200,
        image : "url('assets/images/fighters/asmon.jpg')"
    },
    {
        name : 'Barrack Obama',
        hp : 100,
        image : "url('assets/images/fighters/obama.jpg')"
    },
    {
        name : 'Badcomedian',
        hp : 110,
        image : "url('assets/images/fighters/badcomedian.jpg')"
    },
    {
        name : 'The Rock',
        hp : 190,
        image : "url('assets/images/fighters/dwayne.jpg')"
    },
    {
        name : 'Douglas McArthur',
        hp : 130,
        image : "url('assets/images/fighters/douglas.png')"
    },
    {
        name : 'Walter White',
        hp : 140,
        image : "url('assets/images/fighters/walter.jpg')"
    },
    {
        name : 'Pope Francis',
        hp : 50,
        image : "url('assets/images/fighters/pope.jpg')"
    },
]
let limb_list = {
    '0' : 25,
    '1' : 20,
    '2' : 10,
    '3' : 10,
    '4' : 15,
    '5' : 15
}
let fighters = document.getElementsByClassName('fighter_card');
let fighters_size = 24;
let selected_fighter = 6;
let current_enemy = 0;
let battle_player_fighter = document.getElementsByClassName('player_avatar');
let battle_enemy_fighter = document.getElementsByClassName('enemy_avatar');

let p_hp_bar = document.getElementsByClassName('player_hp');
let e_hp_bar = document.getElementsByClassName('enemy_hp');

let p_ihp = 0;
let e_ihp = 0;
let p_hp = 0;
let e_hp = 0;

let num_defense = 0;
let num_attack = 0;

let defending = []
let attacking = []

let defend_limbs = document.getElementsByClassName('d');
let attack_limbs = document.getElementsByClassName('a');

let player_splatter = document.getElementsByClassName('p_splatter');
let enemy_splatter = document.getElementsByClassName('e_splatter');








function battle_exit()
{
    document.getElementsByClassName('battle_exit')[0].classList.add('hidden_down')
}

function handle_battle_button()
{
    if (num_attack == 1 & num_defense == 2)
    {
        handle_attack();
        reset_body_charts()
    }
}

function reset_body_charts()
{
    attacking = [];
    defending = [];
    num_attack = 0;
    num_defense = 0;
    update_limbs();
}

function handle_attack()
{
    let e_attacking = Math.floor(Math.random() * (5 + 1));
    let e_d1 = Math.floor(Math.random() * (5 + 1));
    let e_d2 = Math.floor(Math.random() * (5 + 1));
    while (e_d1 == e_d2)
    {
        e_d2 = Math.floor(Math.random() * (5 + 1));
    }
    let e_defending = [e_d1, e_d2];
    while (e_defending.includes(e_attacking))
    {
        e_attacking = Math.floor(Math.random() * (5 + 1));
    }
    let e_crit = 1 + Math.round(Math.random() * 0.54);
    let p_crit = 1 + Math.round(Math.random() * 0.54);

    if (!(defending.includes(e_attacking)))
    {
        p_hp -= limb_list[e_attacking] * e_crit;
        if (p_hp < 0)
        {
            p_hp = 0;
        }
        p_hp_bar[0].style.width = `${100 * (p_hp / p_ihp)}%`;
        let dmg = document.createElement('div');
        if (e_crit <= 1.1)
        {
            dmg.innerHTML = `-${limb_list[e_attacking]}`;
        }
        else
        {
            dmg.innerHTML = `CRIT! -${limb_list[e_attacking] * e_crit}`;
        }
        dmg.classList.add('damage');
        dmg.style.animationName = 'damage_motion';
        document.getElementsByClassName('player_health')[0].appendChild(dmg);
    }
    if (!(e_defending.includes(attacking[0])))
    {
        e_hp -= limb_list[attacking[0]] * p_crit;
        if (e_hp < 0)
        {
            e_hp = 0;
        }
        e_hp_bar[0].style.width = `${100 * (e_hp / e_ihp)}%`;
        let dmg = document.createElement('div');
        if (p_crit <= 1.1)
        {
            dmg.innerHTML = `-${limb_list[attacking[0]]}`;
        }
        else
        {
            dmg.innerHTML = `CRIT! -${limb_list[attacking[0]] * p_crit}`;
        }
        dmg.classList.add('damage');
        dmg.style.animationName = 'damage_motion';
        document.getElementsByClassName('enemy_health')[0].appendChild(dmg);
    }

    
    if (p_hp == 0)
    {
        player_dead();
        return
    }
    if (e_hp == 0)
    {
        enemy_dead();
    }
}

function enemy_dead()
{
    battle_enemy_fighter[0].classList.add('dead');
    enemy_splatter[0].classList.add('splatter_visible');
    enemy_splatter[0].style.animationName = 'splatter_motion';
    document.getElementsByClassName('battle_exit')[0].classList.remove('hidden_down')
    document.getElementsByClassName('l')[0].classList.add('result_hide');
    let record = document.createElement('div');
    record.innerHTML = fighters_list[current_enemy].name;
    record.classList.add('win_record');
    document.getElementsByClassName('win_list')[0].appendChild(record);
}

function player_dead()
{
    battle_player_fighter[0].classList.add('dead');
    player_splatter[0].classList.add('splatter_visible');
    player_splatter[0].style.animationName = 'splatter_motion';
    document.getElementsByClassName('battle_exit')[0].classList.remove('hidden_down')
    document.getElementsByClassName('w')[0].classList.add('result_hide');
    let record = document.createElement('div');
    record.innerHTML = fighters_list[current_enemy].name;
    record.classList.add('loss_record');
    document.getElementsByClassName('loss_list')[0].appendChild(record);
}

function select_defense(n)
{
    if (num_defense < 2 && !(attacking.includes(n)) && !(defending.includes(n)))
    {
        num_defense += 1;
        defending.push(n);
    }
    else
    {
        if (defending.includes(n))
        {
            num_defense -= 1;
            if (defending[0] == n)
            {
                defending.shift()
            }
            else if (defending[1] == n)
            {
                defending.pop()
            }
        }
    }
}

function select_attack(n)
{
    if (num_attack < 1 && !(attacking.includes(n)) && !(defending.includes(n)))
    {
        num_attack += 1;
        attacking.push(n);
    }
    else
    {
        if (attacking.includes(n))
        {
            num_attack -= 1;
            attacking = []
        }
    }
}

function update_limbs()
{
    for (let i = 0; i < 6; i++)
    {
        if (defending.includes(i))
        {
            defend_limbs[i].classList.add('limb_shown')
            attack_limbs[i].classList.add('a_limb_inactive')
        }
        else
        {
            defend_limbs[i].classList.remove('limb_shown')
        }

        if (attacking.includes(i))
        {
            attack_limbs[i].classList.add('limb_shown')
            defend_limbs[i].classList.add('d_limb_inactive')
        }
        else
        {
            attack_limbs[i].classList.remove('limb_shown')
        }
        if (!(attacking.includes(i)) && !(defending.includes(i)))
        {
            attack_limbs[i].classList.remove('a_limb_inactive')
            defend_limbs[i].classList.remove('d_limb_inactive')
        }
    }
}

function update_stats()
{
    current_enemy = Math.floor(Math.random() * (23 + 1));
    document.getElementsByClassName('player_name')[0].innerHTML = document.getElementsByClassName('fighter_menu_title')[0].innerHTML;
    document.getElementsByClassName('enemy_name')[0].innerHTML = fighters_list[current_enemy].name;
    p_hp = fighters_list[selected_fighter].hp
    e_hp = fighters_list[current_enemy].hp
    p_ihp = p_hp;
    e_ihp = e_hp;
    battle_player_fighter[0].style.backgroundImage = fighters_list[selected_fighter].image;
    battle_enemy_fighter[0].style.backgroundImage = fighters_list[current_enemy].image;
    battle_player_fighter[0].classList.remove('dead');
    battle_enemy_fighter[0].classList.remove('dead');
    player_splatter[0].style.animationName = null;
    enemy_splatter[0].style.animationName = null;
    player_splatter[0].classList.remove('splatter_visible');
    enemy_splatter[0].classList.remove('splatter_visible');
    p_hp_bar[0].style.width = `100%`;
    e_hp_bar[0].style.width = `100%`;
    document.getElementsByClassName('w')[0].classList.remove('result_hide');
    document.getElementsByClassName('l')[0].classList.remove('result_hide');
}

function set_fighter_num(n)
{
    selected_fighter = n;
}

function set_fighter()
{
    document.getElementsByClassName('cur_fighter')[0].style.backgroundImage = fighters_list[selected_fighter].image;
}

function update_cards()
{
    for (let i = 0; i < fighters_size; i++)
    {
        fighters[i].style.backgroundImage = fighters_list[i].image;
    }
}

function set_name(name)
{
    if (name.length >= 1)
    {
        current_name = name;
        console.log(current_name);
        document.getElementsByClassName('name_field')[0].value = '';
        document.getElementsByClassName('fighter_menu_title')[0].innerHTML = name;

        set_page(1);
    }
}

function update_pages()
{
    for (let i = 0; i < pages.length; i += 1)
    {
        if (i == current_page)
        {
            pages[i].classList.add('shown');
            pages[i].classList.remove('hidden');
        }
        else
        {
            pages[i].classList.remove('shown');
            pages[i].classList.add('hidden');
        }
    }
}

function set_page(num)
{
    current_page = num;
    update_pages();
}