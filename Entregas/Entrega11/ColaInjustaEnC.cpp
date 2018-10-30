void ejercicio0801() {
    int numCasos;
    int n;
    std::cin >> numCasos;
    for (int i = 0; i < numCasos; i++) {
        Queue < int > * q = new Queue < int > ();
        cin >> n;
        while (n != -1) {
            q - > push_back(n);
            cin >> n;
        }
        cin >> n;
        cout << * q;
        q - > reverseFirstK(n);
        cout << * q;
        delete q;
    }
}

void reverseFirstK(int num) {
		if (num >= 2) {
			Nodo *puntAux = _prim;
			Nodo *iniAnt = _prim;
			Nodo *aux = _prim->_sig;
			for (int i = 1; i < num && aux != NULL; i++){
				_prim = aux;
				aux = _prim->_sig;
				iniAnt->_sig = _prim->_sig;
				_prim->_sig = puntAux;
				puntAux = _prim;
			}
		}
	}