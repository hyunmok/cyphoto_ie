/**
 *
 * defineClass() -- 자바스크립트 클래스를 정의하기 위한 유틸리티 함수
 *
 * 이 함수는 유일한 전달인자로 객체 하나가 넘어오기를 기대한다.
 * 그 객체에 있는 테이터를 기반으로 새로운 자바스크립트 클래스를 정의하고
 * 새 클래스의 생성자 함수를 반환한다.
 * 이 함수는 클래스를 정의하는 반복적인 작업을 처리한다.
 * 이 작업에는 상속을 제대로 받기 위해 프로토타입 객체를 설정하는 것과
 * 다른 타입에서 메서드를 복사해오는 일 등이 포함된다.
 *
 * 전달인자로 넘어오는 객체에는 다음 프로퍼티 모두 또는 일부가 있어야 한다.
 *
 *      name : 정의되는 클래스의 이름, 만약 이 값이 기술되어 있다면,
 *             프로토타입 객체에 있는 classname 프로퍼티에 저장된다.
 *
 *    extend : 확장될 클래스의 생성자. 만약 이입이 빠져있다면 Object() 생성자가 사용된다.
 *             이 값은 프로토타입 객체의 superclass 프로퍼티에 저장된다.
 *
 * construct : 클래스의 생성자 함수. 이것이 빠져있으면 새로운 빈 함수가 사용된다.
 *             이 값은 나중에 이 함수의 반환값이 되며 프로토타입 객체의 constructor프로퍼티에도 저장된다.
 *
 *   methods : 클래스를 위한 인스턴스 메서드들(그리고 공유된 다른 프로퍼티들)을 지정하는 객체.
 *             이 객체의 프로퍼티들은 클래스의 프로토타입 객체로 복사된다.
 *             만약 이것이 빠져있으면 대신 빈 객체가 사용된다. 프로퍼티 이름인 classname과 superclass,
 *             constructor는 예약되어 있는 이름이며 이 객체에서 사용되서는 안된다.
 *
 *   statics : 클래스를 위한 정석 메서드들(그리고 정적인 다른 프로퍼티들)을 지정하는 객체.
 *             이 객체의 프로퍼티는 생성자 함수의 프로퍼티가 된다.
 *             만약 이것이 빠져있으면, 빈 객체가 대신 사용된다.
 *
 *   borrows : 생성자 함수의 배열 혹은 생성자 함수.
 *             주어진 클래스의 인스턴스 메서드들은 새 클래스가 주어진 클래스의 메서드를 빌려갈 수 있게
 *             새 클래스의 프로토타입 객체로 복사된다. 생성자는 주어진 순서대로 처리되기 때문에 배열의
 *             마지막에 있는 클래스의 메서드는 배열의 앞에 있는 클래스의 메서드를 덮어쓸 수 있다.
 *             빌려온 메서드는 위의 methods객체에 있는 프로퍼티보다 먼저 프로토타입 객체에 저장된다는 것을
 *             주목하라. 따라서, methods 객체에 기술되어 있는 메서드는 빌려온 메서드를 덮어쓸 수 있다.
 *             만약 이 프로퍼티가 지정되지 않으면 아무런 메서드도 빌려오지 않는다.
 *
 *  provides : 생성자 함수의 배열 혹은 생성자 함수.
 *             프로토타입 객체가 완전히 초기화되고 나면, 이 함수는 프로토타입이 가진 메서드의 이름과
 *             전달인자의 수가 이 클래스들의 각각이 정의한 인스턴스 메서드와 일치하는지 검증한다.
 *             아무런 메서드도 복사되지는 않는다.
 *             이것은 단순히 이 클래스가 주어진 클래스의 기능을 '제공한다.'라고 주장하는 바와 같다.
 *             만약 이 주장이 잘못된 것이라면 이 메서드는 예외를 발생시킨다.
 *             아무런 예외도 발생되지 않으면(오리 타이핑을 사용하여) 새 클래스의 인스턴스는 다른 타입의
 *             인스턴스로도 생각할 수 있다. 이 프로퍼티가 기술되지 않으면 검증은 수행되지 않는다.
 */



function defineClass(data) {
	// 전달인자 객체에서 우리가 사용할 필드를 추출한다.
	// 기본값을 설정한다.
	var classname	= data.name;
	var superclass	= data.extend || Object;
	var constructor = data.construct || function() {};
	var methods = data.methods || {};
	var statics = data.statics || {};
	var borrows;
	var provides;

	// borrows는 생성자 한개이거나 생성자의 배열일 수 있다.
	if(!data.borrows) borrows = [];
	else if(data.borrows instanceof Array) borrows = data.borrows;
	else borrows = [data.borrows];

	// provides 프로퍼티에 대해서도 똑같은 일을 수행한다.
	if(!data.provides) provides = [];
	else if(data.provides instanceof Array) provides = data.provides;
	else provides = [data.provides];

	// 새로 만들어질 클래스의 프로토타입이 될 객체를 생성한다.
	var proto = new superclass();

	// 새로운 프로토타입 객체의 프로퍼티 중 상속받지 않은 것은 삭제한다.
	for(var p in proto)
		if(proto.hasOwnProperty(p)) delete proto[p];

	// 믹스인 클래스에서 프로토타입으로 메서드를 복사해서 빌려온다.
	for(var i = 0; i < borrows.length; i++) {
		var c = data.borrows[i];
		borrows[i] = c;
		// 메서드 프로퍼티들을 c의 프로토타입에서 우리가 만든 프로토타입으로 복사한다.
		for(var p in c.prototype) {
			if(typeof c.prototype[p] != "function") continue;
			proto[p] = c.prototype[p];
		}
	}

	// 인스턴스 메서드를 프로토타입 객체로 복사한다.
	// 이 작업은 믹스인 클래스의 메서드를 덮어쓸 수도 있다.
	for(var p in methods) proto[p] = methods[p];

	// 프로토타입의 예약된 프로퍼티인 constructor와 superclass, classname을 설정한다.
	proto.constructor = constructor;
	proto.superclass = superclass;
	// classname는 이름이 실제로 기술되어 있을 때만 설정된다.
	if(classname) proto.classname = classname;

	// 우리가 만든 프로토타입이 제공하기로 된 모든 메서드를 제종하는 지 검증한다.
	for(var i = 0; i < provides.length; i++) {
		var c = provides[i];
		for(var p in c.prototype) {	// 각 프로퍼티에 대해서
			if(typeof c.prototype[p] != "function") continue;	// 오로지 메서드만
			if(p == "constructor" || p == "superclass") continue;
			// 같은 이름의 메서드가 있고, 선언된 전달인자의 수가 같은지를 검사한다.
			// 만약 그렇다면 계속 진행한다.
			if(p in proto && typeof proto[p] == "function" &&
				proto[p].length == c.prototype[p].length) continue;
			// 그렇지 않다면 예외를 발생시킨다.
			throw new Error("Class " + classname + " does not provide method" + c.classname + "." + p);
		}
	}

	// 프로토타입 객체와 생성자 함수를 연결시킨다.
	constructor.prototype = proto;

	// 정적인 프로퍼티를 생성자로 복사한다.
	for(var p in statics) constructor[p] = data.statics[p];

	// 마지막으로 생성자 함수를 반환한다.
	return constructor;

}	// defineClass END