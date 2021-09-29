function HOC(WrapedComponent, data) {
    return class Test extends Component {
        render() {
            const newProps = {
                title: 'new title',
                description: 'description'
            };
            return <WrapedComponent {...this.props} {...newProps} />
        }
    }
}

const { Provider, consumer } = React.createContext(defaultValue);

const MyComponent = (props) => {
    return <div style={{backgroundColor: '#ff00ff'}}>{props.children}</div>
}

function App() {
    return <MyComponent>
        <div>Welcome</div>
    </MyComponent>
}

const lazyComponent = lazy(() => import('../components/ImagesLightBox'), () => {
    console.log("import done");
});