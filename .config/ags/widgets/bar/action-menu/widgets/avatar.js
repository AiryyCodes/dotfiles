const username = Variable(Utils.exec('whoami'));

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

export const Avatar = () => Widget.Box({
	children: [
		Widget.Icon({
			className: 'profile-pic',
			name: 'profile-pic',
			icon: 'profile-pic',
		}),
		Widget.Label({
			className: 'username',
			label: capitalizeFirstLetter(username.value),
		}),
	]
});
