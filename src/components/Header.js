import Button from "./Button"
const Header = ({title, onUen, UEN, onWeather, Weather}) => {
  return (
    <header className="header">
        <h1>{title}</h1>
        <Button bgCol={UEN ? 'red':'green'}
                text={UEN ? 'Close UEN': 'Check UEN'}
                clickFunc={onUen}/>
        <Button bgCol={Weather ? 'red': 'green'}
                text={Weather ? 'Close Weather': 'Check Weather'}
                clickFunc={onWeather}/>
    </header>
  )
}

export default Header