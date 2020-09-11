/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG (http://www.swig.org).
 * Version 4.0.2
 *
 * Do not make changes to this file unless you know what you are doing--modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

package io.adaptivecards.objectmodel;

public class MediaSourceVector extends java.util.AbstractList<MediaSource> implements java.util.RandomAccess {
  private transient long swigCPtr;
  protected transient boolean swigCMemOwn;

  protected MediaSourceVector(long cPtr, boolean cMemoryOwn) {
    swigCMemOwn = cMemoryOwn;
    swigCPtr = cPtr;
  }

  protected static long getCPtr(MediaSourceVector obj) {
    return (obj == null) ? 0 : obj.swigCPtr;
  }

  @SuppressWarnings("deprecation")
  protected void finalize() {
    delete();
  }

  public synchronized void delete() {
    if (swigCPtr != 0) {
      if (swigCMemOwn) {
        swigCMemOwn = false;
        AdaptiveCardObjectModelJNI.delete_MediaSourceVector(swigCPtr);
      }
      swigCPtr = 0;
    }
  }

  public MediaSourceVector(MediaSource[] initialElements) {
    this();
    reserve(initialElements.length);

    for (MediaSource element : initialElements) {
      add(element);
    }
  }

  public MediaSourceVector(Iterable<MediaSource> initialElements) {
    this();
    for (MediaSource element : initialElements) {
      add(element);
    }
  }

  public MediaSource get(int index) {
    return doGet(index);
  }

  public MediaSource set(int index, MediaSource e) {
    return doSet(index, e);
  }

  public boolean add(MediaSource e) {
    modCount++;
    doAdd(e);
    return true;
  }

  public void add(int index, MediaSource e) {
    modCount++;
    doAdd(index, e);
  }

  public MediaSource remove(int index) {
    modCount++;
    return doRemove(index);
  }

  protected void removeRange(int fromIndex, int toIndex) {
    modCount++;
    doRemoveRange(fromIndex, toIndex);
  }

  public int size() {
    return doSize();
  }

  public MediaSourceVector() {
    this(AdaptiveCardObjectModelJNI.new_MediaSourceVector__SWIG_0(), true);
  }

  public MediaSourceVector(MediaSourceVector other) {
    this(AdaptiveCardObjectModelJNI.new_MediaSourceVector__SWIG_1(MediaSourceVector.getCPtr(other), other), true);
  }

  public long capacity() {
    return AdaptiveCardObjectModelJNI.MediaSourceVector_capacity(swigCPtr, this);
  }

  public void reserve(long n) {
    AdaptiveCardObjectModelJNI.MediaSourceVector_reserve(swigCPtr, this, n);
  }

  public boolean isEmpty() {
    return AdaptiveCardObjectModelJNI.MediaSourceVector_isEmpty(swigCPtr, this);
  }

  public void clear() {
    AdaptiveCardObjectModelJNI.MediaSourceVector_clear(swigCPtr, this);
  }

  public MediaSourceVector(int count, MediaSource value) {
    this(AdaptiveCardObjectModelJNI.new_MediaSourceVector__SWIG_2(count, MediaSource.getCPtr(value), value), true);
  }

  private int doSize() {
    return AdaptiveCardObjectModelJNI.MediaSourceVector_doSize(swigCPtr, this);
  }

  private void doAdd(MediaSource x) {
    AdaptiveCardObjectModelJNI.MediaSourceVector_doAdd__SWIG_0(swigCPtr, this, MediaSource.getCPtr(x), x);
  }

  private void doAdd(int index, MediaSource x) {
    AdaptiveCardObjectModelJNI.MediaSourceVector_doAdd__SWIG_1(swigCPtr, this, index, MediaSource.getCPtr(x), x);
  }

  private MediaSource doRemove(int index) {
    long cPtr = AdaptiveCardObjectModelJNI.MediaSourceVector_doRemove(swigCPtr, this, index);
    return (cPtr == 0) ? null : new MediaSource(cPtr, true);
  }

  private MediaSource doGet(int index) {
    long cPtr = AdaptiveCardObjectModelJNI.MediaSourceVector_doGet(swigCPtr, this, index);
    return (cPtr == 0) ? null : new MediaSource(cPtr, true);
  }

  private MediaSource doSet(int index, MediaSource val) {
    long cPtr = AdaptiveCardObjectModelJNI.MediaSourceVector_doSet(swigCPtr, this, index, MediaSource.getCPtr(val), val);
    return (cPtr == 0) ? null : new MediaSource(cPtr, true);
  }

  private void doRemoveRange(int fromIndex, int toIndex) {
    AdaptiveCardObjectModelJNI.MediaSourceVector_doRemoveRange(swigCPtr, this, fromIndex, toIndex);
  }

}
