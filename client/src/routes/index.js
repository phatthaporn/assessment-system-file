import { useRoutes } from 'react-router-dom';
import Routes from './routes';

export default function ThemeRoutes() {
    return useRoutes(Routes());
}
