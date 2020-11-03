import React from 'react';
import './Modal.css';
import '../css/Buttons.css';

export default class Modal extends React.Component {
    state = {
        isOpen: false
    }

    render() {
        return (
            <React.Fragment>
                <button onClick={() => this.setState({isOpen: true})} className="button button-info">
                    Информация о выполнении заданий
                </button>

                {this.state.isOpen && <div className="modal">
                    <div className="modal-body">
                        <h3>Тестовое задание на стажера Docsvision</h3>
                        <p>
                            Тестовое задание выполнено. Полностью работоспособность можно будет посмотреть, когда будут приходить данные из таблицы Оборудование. На данный момент ничего не приходит.
                        </p>
                        <p>
                            Задание было выполнено за 3 дня. С реактом работал впервые
                        </p>
                        <ol>
                            <li>
                                Первый день - разработка и реализация алгоритмов для 1 и 2 подзадачи
                            </li>
                            <li>
                                Второй день - перенос все в реакт, реализация 3 и частично 4 задачи
                            </li>
                            <li>
                                Третий день - окончание работы, сломанная БД, базовая стилизация элементов
                            </li>
                        </ol>
                        <button onClick={() => this.setState({isOpen: false})} className="button button-info">Закрыть</button>
                    </div>
                </div>}
            </React.Fragment>
        )
    }
}
